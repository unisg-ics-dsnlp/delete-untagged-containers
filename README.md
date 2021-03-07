# Delete untagged containers

Deletes containers that do not have tags from [Github container registry](https://docs.github.com/en/packages/guides/about-github-container-registry) (ghcr.io)

## Inputs

### `org`

The organization to delete the packages from (defaults to current org)

### `package_name`

**Required:** The name of the package to delete

## Outputs

### `time`

The time we greeted you.

## Example usage

uses: actions/delete-untagged-containers@v1
with:
  package_name: 'example'