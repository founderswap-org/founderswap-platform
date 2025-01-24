name: Deploy to Vercel and Create Release

on:
  push:
    branches:
      - main
      - release/*
      - develop

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}

jobs:
  Deploy-Develop:
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install Vercel CLI
        run: pnpm add vercel@latest -w 

      - name: Set up for Development Environment
        run: echo "VERCEL_PROJECT_ID=${{ secrets.VERCEL_PROJECT_ID_DEVELOPMENT }}" >> $GITHUB_ENV

      - name: Deploy to Development Environment
        run: |
          vercel pull --yes --environment=development --token=${{ secrets.VERCEL_TOKEN }}
          vercel build --token=${{ secrets.VERCEL_TOKEN }}
          vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }} > domain.txt
          vercel alias --token ${{ secrets.VERCEL_TOKEN }} set `cat domain.txt` founderswap-development.vercel.app

  Deploy-Staging:
    if: startsWith(github.ref, 'refs/heads/release/')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Set up for Staging Environment
        run: echo "VERCEL_PROJECT_ID=${{ secrets.VERCEL_PROJECT_ID_STAGING }}" >> $GITHUB_ENV

      - name: Deploy to Staging Environment
        run: |
          vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
          vercel build --token=${{ secrets.VERCEL_TOKEN }}
          vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }} > domain.txt
          vercel alias --token ${{ secrets.VERCEL_TOKEN }} set `cat domain.txt` weeezy-staging.vercel.app

  Deploy-Production:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Set up for Production Environment
        run: echo "VERCEL_PROJECT_ID=${{ secrets.VERCEL_PROJECT_ID_PRODUCTION }}" >> $GITHUB_ENV

      - name: Deploy to Production Environment
        run: |
          vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
          vercel build --token=${{ secrets.VERCEL_TOKEN }}
          vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }} > domain.txt
          vercel alias --token ${{ secrets.VERCEL_TOKEN }} set `cat domain.txt` weeezy-production.vercel.app

  Tag-and-Release:
    if: github.ref == 'refs/heads/main'
    needs: Deploy-Production
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.TOKEN_GITHUB }}

      - name: Increment tag and create release branch
        run: |
          LATEST_TAG=$(git describe --tags $(git rev-list --tags --max-count=1))
          echo "LATEST_TAG=$LATEST_TAG" >> $GITHUB_ENV

          NEW_TAG=$(echo $LATEST_TAG | awk -F. -v OFS='.' '{$NF++; print}')
          echo "NEW_TAG=$NEW_TAG" >> $GITHUB_ENV

          git tag $NEW_TAG
          git push origin $NEW_TAG --force

          NEW_BRANCH_NAME="release/${NEW_TAG#v}"
          git checkout -b $NEW_BRANCH_NAME $NEW_TAG

          # update package.json version
          npm version --no-git-tag-version ${NEW_TAG#v}

          # Commit edits
          git config user.name "github-actions"
          git config user.email "github-actions@github.com"
          git add package.json
          git commit -m "Bump version to ${NEW_TAG#v}"

          git push --set-upstream origin $NEW_BRANCH_NAME --force
        env:
          GITHUB_TOKEN: ${{ secrets.TOKEN_GITHUB }}

      #Create a release from the LATEST_TAG before the new one
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: ${{ env.LATEST_TAG }}
          name: ${{ env.LATEST_TAG }}
        env:
          GITHUB_TOKEN: ${{ secrets.TOKEN_GITHUB }}
