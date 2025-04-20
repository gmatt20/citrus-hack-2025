#!/bin/bash

# Colors for better visibility
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting all servers...${NC}"

# Store PIDs to kill them later
pids=()

# Function to kill all processes on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down all servers...${NC}"
    
    # Kill all processes in the background
    for pid in "${pids[@]}"; do
        if ps -p $pid > /dev/null; then
            echo -e "${YELLOW}Killing process $pid${NC}"
            kill $pid 2>/dev/null
        fi
    done
    
    echo -e "${GREEN}All servers stopped.${NC}"
    exit 0
}

# Trap Ctrl+C (SIGINT) and call cleanup
trap cleanup SIGINT SIGTERM

# Start backend server (Python)
echo -e "${GREEN}Starting backend server...${NC}"
cd backend
python3 -m venv venv
flask --app ml_api run &
BACKEND_PID=$!
pids+=($BACKEND_PID)
cd ..
echo -e "${GREEN}Backend server started with PID $BACKEND_PID${NC}"

# Start the Convex server
echo -e "${GREEN}Starting Convex authentication server...${NC}"
cd frontend
npx convex dev &
CONVEX_PID=$!
pids+=($CONVEX_PID)
echo -e "${GREEN}Convex server started with PID $CONVEX_PID${NC}"

# Start frontend server (Next.js)
echo -e "${GREEN}Starting frontend server...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
pids+=($FRONTEND_PID)
cd ..
echo -e "${GREEN}Frontend server started with PID $FRONTEND_PID${NC}"

echo -e "${GREEN}All servers are running. Press Ctrl+C to stop all servers.${NC}"

# Wait forever until Ctrl+C is pressed
wait