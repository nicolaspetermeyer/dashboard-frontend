echo "Delete current build"
sudo rm -r /var/www/html/*

echo "Build current version"
npm run build

echo "Deploying files to server..."
sudo mv build/* /var/www/html/

echo "Done!"
    
