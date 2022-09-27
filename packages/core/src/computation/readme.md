# Generating API and Model Files

First install openapi-generator-cli [here](https://openapi-generator.tech/docs/installation)

Then run the following from this directory (may need elevated privileges):

```bash
sudo openapi-generator-cli generate -i https://devkit-pce-staging.azurewebsites.net/swagger/docs.yaml -g typescript-fetch --config openapi-generator-config.json
```
