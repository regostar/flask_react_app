
cd client
npm install  # Ensure dependencies are installed
npm run build  # Generate the production build

docker build -t react_app .

docker-compose up --build

