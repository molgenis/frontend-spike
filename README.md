# Molgenis - For Scientific Data

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
docker-compose -f docker/docker-compose.yml up
./cli watch
```

> Wait until the Molgenis service started. You can check this by visiting http://locahost:8080

* Open a Chromium browser and visit **chrome://flags**
* Enable **experimental web platform features**
* Visit http://localhost/login and login using user/pw **admin/admin**
* Go to http://localhost/menu/importdata/importwizard
* In the following order, import from **docker/molgenis/data**:
  * quest.xlsx
  * eu_bbmri_eric.xlsx
  * root.xlsx
  * de.xlsx

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