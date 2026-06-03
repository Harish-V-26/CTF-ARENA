#!/bin/bash

echo "Starting Backend API (Port 5000)..."
cd backend
python3 app.py &
BACKEND_PID=$!
cd ..

echo "Starting Learning App (Port 8000)..."
python3 -m http.server 8000 &
LEARN_PID=$!

echo "Starting CTF Arena / Challenges (Port 8085)..."
cd ../CTF-CHALLENGES-WEBSITE
python3 -m http.server 8085 &
CHALLENGE_PID=$!
cd - > /dev/null

echo "================================================="
echo "All services are running in the background!"
echo "Learning Website:  http://localhost:8000"
echo "CTF Arena:         http://localhost:8085"
echo "Backend API:       http://localhost:5000"
echo "================================================="
echo "Press [CTRL+C] to stop all services."

# Wait for user to press CTRL+C, then kill all background processes
trap "kill $BACKEND_PID $LEARN_PID $CHALLENGE_PID; echo 'All services stopped.';" EXIT
wait
