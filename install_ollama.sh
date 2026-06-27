#!/bin/bash
# ==============================================================================
# Script: ollama-gemma4-setup.sh
# Purpose: Idempotent installation & configuration of Ollama + Gemma 4 E2B on AWS
# OS: Ubuntu (AWS Deep Learning AMI)
# ==============================================================================

# Exit immediately if a command exits with a non-zero status
set -euo pipefail

# --- Configuration ---
MODEL_NAME="gemma4:e2b"
OLLAMA_PORT="11434"
BIND_ADDRESS="0.0.0.0"

# --- Logging Functions ---
log_info()  { echo -e "\e[32m[INFO] $(date +'%Y-%m-%d %H:%M:%S') - $1\e[0m"; }
log_warn()  { echo -e "\e[33m[WARN] $(date +'%Y-%m-%d %H:%M:%S') - $1\e[0m"; }
log_error() { echo -e "\e[31m[ERROR] $(date +'%Y-%m-%d %H:%M:%S') - $1\e[0m"; >&2; exit 1; }

# --- 1. Pre-Flight Checks ---
log_info "Starting pre-flight checks..."
if [ "$EUID" -ne 0 ]; then
  log_error "This script must be run as root. Please use sudo."
fi

if command -v nvidia-smi &> /dev/null; then
  log_info "NVIDIA GPU detected. Ollama will automatically configure CUDA acceleration."
  nvidia-smi --query-gpu=gpu_name,memory.total --format=csv,noheader
else
  log_warn "No NVIDIA GPU detected by nvidia-smi. Ollama will fallback to CPU inference."
fi

# --- 2. Install Ollama ---
if command -v ollama &> /dev/null; then
  log_info "Ollama is already installed. Running the install script to ensure it is the latest version."
fi
log_info "Downloading and installing Ollama..."
curl -fsSL https://ollama.com/install.sh | sh

# --- 3. Configure Systemd for External Access ---
log_info "Configuring systemd to bind Ollama to ${BIND_ADDRESS}:${OLLAMA_PORT}..."
SYSTEMD_DIR="/etc/systemd/system/ollama.service.d"
mkdir -p "${SYSTEMD_DIR}"

cat <<EOF > "${SYSTEMD_DIR}/override.conf"
[Service]
Environment="OLLAMA_HOST=${BIND_ADDRESS}:${OLLAMA_PORT}"
EOF

log_info "Reloading systemd and restarting Ollama service..."
systemctl daemon-reload
systemctl enable ollama
systemctl restart ollama

# Wait for the service to become responsive
log_info "Waiting for Ollama API to become healthy..."
TIMEOUT=30
while ! curl -s "http://localhost:${OLLAMA_PORT}/api/tags" &> /dev/null; do
  sleep 2
  TIMEOUT=$((TIMEOUT - 2))
  if [ "$TIMEOUT" -le 0 ]; then
    log_error "Ollama service failed to start or bind to the port within the timeout."
  fi
done
log_info "Ollama API is up and running."

# --- 4. Pull the Model ---
log_info "Downloading model: ${MODEL_NAME} (This may take a few minutes)..."
ollama pull "${MODEL_NAME}"

# --- 5. Health Checks ---
log_info "Executing final health checks..."

# Check 1: Systemd Service
if systemctl is-active --quiet ollama; then
  log_info "Health Check 1/3 Passed: Ollama systemd service is ACTIVE."
else
  log_error "Health Check 1/3 Failed: Ollama systemd service is not active."
fi

# Check 2: Model Installed
if ollama list | grep -q "${MODEL_NAME}"; then
  log_info "Health Check 2/3 Passed: Model ${MODEL_NAME} is installed."
else
  log_error "Health Check 2/3 Failed: Model ${MODEL_NAME} is not found in the local registry."
fi

# Check 3: OpenAI-Compatible API Endpoint
API_HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}\n" "http://localhost:${OLLAMA_PORT}/v1/models")
if [ "$API_HTTP_STATUS" -eq 200 ]; then
  log_info "Health Check 3/3 Passed: OpenAI-compatible endpoint (/v1/models) is accessible."
else
  log_error "Health Check 3/3 Failed: OpenAI endpoint returned HTTP ${API_HTTP_STATUS}."
fi

# --- 6. Summary ---
PUBLIC_IP=$(curl -s ifconfig.me || echo "YOUR_EC2_PUBLIC_IP")

log_info "============================================================"
log_info "Installation Complete!"
log_info "API Base URL: http://${PUBLIC_IP}:${OLLAMA_PORT}/v1"
log_info "Installed Models:"
ollama list
log_info "============================================================"
