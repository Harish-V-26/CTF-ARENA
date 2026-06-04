#!/bin/bash

echo "Starting Website Learn Backend API (Port 5000)..."
cd website_learn/backend
python3 app.py &
LEARN_BACKEND_PID=$!
cd ../..

echo "Starting Website Learn Frontend (Port 8000)..."
cd website_learn/frontend
python3 -m http.server 8000 &
LEARN_FRONTEND_PID=$!
cd ../..

echo "Starting Website Challenges Backend API (Port 5002)..."
cd website_challenges/backend
python3 app.py &
CHALL_BACKEND_PID=$!
cd ../..

echo "Starting Website Challenges Frontend (Port 8002)..."
cd website_challenges/frontend
python3 -m http.server 8002 &
CHALL_FRONTEND_PID=$!
cd ../..

LOCAL_IP=$(hostname -I | awk '{print $1}')
if [ -z "$LOCAL_IP" ]; then
  LOCAL_IP="localhost"
fi

echo "================================================="
echo "All separate websites are running!"
echo "Local Access:"
echo "  Learn Website:      http://localhost:8000"
echo "  Challenges Website: http://localhost:8002"
echo "Network Access (for other users on the same network):"
echo "  Learn Website:      http://$LOCAL_IP:8000"
echo "  Challenges Website: http://$LOCAL_IP:8002"
echo "================================================="
echo "Press [CTRL+C] to stop all services."

# Graceful cleanup on exit
trap "kill $LEARN_BACKEND_PID $LEARN_FRONTEND_PID $CHALL_BACKEND_PID $CHALL_FRONTEND_PID; echo 'All services stopped.';" EXIT
wait
