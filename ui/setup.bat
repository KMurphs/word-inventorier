npx create-react-app ui --template typescript

cd ui


npm uninstall tailwindcss postcss autoprefixer
npm install tailwindcss@latest postcss@latest autoprefixer@latest

npx tailwindcss init -p

npm uninstall tailwindcss postcss autoprefixer
npm install tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9