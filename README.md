# Molgenis - We Accelerate Scientific Discovery

MOLGENIS is a modular web application for scientific data. MOLGENIS was born from
molecular genetics research (and was called 'molecular genetics information system')
but has grown, thanks too many sponsors and contributors, to be used in many
scientifc areas such as biobanking, rare disease research, patient registries
and even energy research. MOLGENIS provides researchers with user friendly and
scalable software infrastructures to capture, exchange, and exploit the large
amounts of data that is being produced by scientific organisations all around
the world.

## Install

```bash

git clone git@github.com:molgenis/frontend-spike.git
cd frontend-spike
yarn
cp molgenis/.molgenisrc.defaults .molgenisrc
cp docker/.env.example docker/.env
./cli watch
# Open another tab to run Docker services in the foreground:
cd docker
docker-compose up
```

> Wait until the Molgenis Docker service fully started. This takes a minute or so, depending on the performance of your computer. [Verify](http://localhost:8080) that the Molgenis instance is running; you should see the Molgenis homepage.

* Open a Chromium browser and visit **chrome://flags**
* Enable **Experimental Productivity Features** and restart the browser
* Visit the [login screen](http://localhost/login); login using username/password **admin/admin**
* Go to the [data import wizard](http://localhost/menu/importdata/importwizard) and import these files in the in the following order from **docker/molgenis/data**:
  * quest.xlsx
  * eu_bbmri_eric.xlsx
  * root.xlsx
  * de.xlsx

* Visit the [SPA homepage](http://localhost)

> Use the [livereload extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) to autoreload the browser during development.

## Configuration

### Docker host networking

Linux users; make sure you add the following hostnames to **/etc/hosts** when
using *NETWORK_MODE=host* (in docker/.env):

```bash
sudo echo "127.0.0.1 elasticsearch" >> /etc/hosts
sudo echo "127.0.0.1 minio" >> /etc/hosts
sudo echo "127.0.0.1 molgenis" >> /etc/hosts
sudo echo "127.0.0.1 opencpu" >> /etc/hosts
sudo echo "127.0.0.1 postgresql" >> /etc/hosts
```
