#!/bin/bash

# set -e making the commands if they were like &&
# set -x putting + before every line
set -ex

read -e -p "Enter the path to the install dir (or hit enter for default path): " -i "$HOME/www/lantosistvan" INSTALL_DIR
echo $INSTALL_DIR
REPO_DIR=$INSTALL_DIR

echo -e "\nCreating folder structure:"
mkdir -p $REPO_DIR
echo -e "\
  $REPO_DIR\n\
Done!"

if test "$(ls -A "$REPO_DIR")"; then
  echo -e "\n\"$REPO_DIR\" directory is not empty!\nYou have to remove everything from here to continue!\nRemove \"$REPO_DIR\" directory (y/n)?"
  read answer
  if echo "$answer" | grep -iq "^y" ;then
    rm -rf $REPO_DIR/
    echo -e "\"$REPO_DIR\" is removed, continue installation...";
    mkdir -p $REPO_DIR
    echo -e "\nCloning git repo into \"$REPO_DIR\":"
    cd $REPO_DIR
    git clone https://github.com/DJviolin/lantosistvan.git $REPO_DIR
    chmod +x $REPO_DIR/docker/service-start.sh $REPO_DIR/docker/service-stop.sh
    echo -e "\nShowing working directory..."
    ls -al $REPO_DIR
  else
    echo -e "\nScript aborted to run\nExiting..."; exit 1;
  fi
else
  echo -e "\nCloning git repo into \"$REPO_DIR\":"
  cd $REPO_DIR
  git clone https://github.com/DJviolin/lantosistvan.git $REPO_DIR
  chmod +x $REPO_DIR/docker/service-start.sh $REPO_DIR/docker/service-stop.sh
  echo -e "Showing working directory..."
  ls -al $REPO_DIR
fi

echo -e "\nCreating additional files for the stack:"

echo -e "\nGenerating $REPO_DIR/app/config/mail.js file:"
read -e -p "host (default): " -i "smtp.gmail.com" HOST
read -e -p "port (default): " -i "465" PORT
read -e -p "user (your sender email account's username): " USER
read -e -p "user (your sender email account's password): " PASS
read -e -p "from (sender email account, eg. something@domain.com): " FROM
read -e -p "to (receiver email account, eg. something@domain.com): " TO
cat <<EOF > $REPO_DIR/app/config/mail.js
'use strict';

module.exports = {
  host: '$HOST',
  port: '$PORT',
  user: '$USER',
  pass: '$PASS',
  from: '$FROM',
  to: '$TO'
};
EOF
cat $REPO_DIR/app/config/mail.js

# bash variables in Here-Doc, don't use 'EOF'
# http://stackoverflow.com/questions/4937792/using-variables-inside-a-bash-heredoc
# http://stackoverflow.com/questions/17578073/ssh-and-environment-variables-remote-and-local

echo -e "\nCreating: $REPO_DIR/docker/lantosistvan.service\n"
cat <<EOF > $REPO_DIR/docker/lantosistvan.service
[Unit]
Description=LANTOSISTVAN
After=etcd.service
After=docker.service
Requires=docker.service

[Service]
TimeoutStartSec=0
#KillMode=none
ExecStartPre=-/opt/bin/docker-compose --file $REPO_DIR/docker/docker-compose.yml kill
ExecStartPre=-/opt/bin/docker-compose --file $REPO_DIR/docker/docker-compose.yml rm --force
#ExecStart=/opt/bin/docker-compose --file $REPO_DIR/docker/docker-compose.yml up --force-recreate
ExecStart=/opt/bin/docker-compose --file $REPO_DIR/docker/docker-compose.yml up
ExecStartPost=/usr/bin/etcdctl set /LANTOSISTVAN Running
ExecStop=/opt/bin/docker-compose --file $REPO_DIR/docker/docker-compose.yml stop
ExecStopPost=/usr/bin/etcdctl rm /LANTOSISTVAN
Restart=always
#RestartSec=30s

[X-Fleet]
Conflicts=lantosistvan.service
EOF
cat $REPO_DIR/docker/lantosistvan.service

cd $HOME

echo -e "\n
Stack has successfully built!\n\n\
Run docker-compose with:\n\
  $ docker-compose --file $REPO_DIR/docker/docker-compose.yml build\n\
Run the systemd service with:\n\
  $ cd $REPO_DIR/docker && ./service-start.sh\n\
Stop the systemd service with:\n\
  $ cd $REPO_DIR/docker && ./service-stop.sh"
echo -e "\nAll done! Exiting..."
