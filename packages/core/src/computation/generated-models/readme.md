# Generated Models

We use [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen) to generate models.

> :warning: Currently, the generated models do not confirm to ES Module standards as the do not include a .js file extension on all imports. We have manually added the extension to all imports for now and the functionality should be added to the generator with [this PR](https://github.com/ferdikoomen/openapi-typescript-codegen/pull/1226)

## How to generate

Run the following from the ./generated-models directory

```bash
npx openapi-typescript-codegen --input https://devkit-pce-staging.azurewebsites.net/swagger/docs.yaml --output ./generated-models
```
