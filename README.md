# Delete untagged containers

Deletes containers that do not have tags from [Github container registry](https://docs.github.com/en/packages/guides/about-github-container-registry) (ghcr.io)

Note that this has not been fully tested with non-user orgs as the APIs differ. Use at your own risk

## Inputs

### `package_name`

**Required:** The name of the package to delete

### `token`

**Required:** Access token to use for deleting packages


## Example usage

```yaml
name: Remove old package versions
on:
  workflow_dispatch:
    inputs:
      package_name:
        description: 'The name of the package to delete'     
        required: true

jobs:
  remove-package-versions:
    runs-on: ubuntu-latest
    steps:
      - name: purge packages
        uses: dylanratcliffe/delete-untagged-containers@main
        with:
          package_name: ${{ github.event.inputs.package_name }}
          # This is a person access token with
          token: ${{ secrets.CR_PAT }}

```