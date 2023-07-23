echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* ubuntu@172.23.4.80:~/

# /var/www/172.23.4.80/

echo "Done!"
    