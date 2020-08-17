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
docker-compose -f docker/docker-compose.yml up
./cli watch
```

* Open a Chromium browser
* Enable **experimental web platform features** under *chrome://flags*
* Go to http://localhost and start developing

> Use the [livereload extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) to autoreload on file-change.
