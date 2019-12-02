Advent of Code - TS
===================

The solutions are in typescript language.

Years:
* 2017 (partial)
* 2018 (partial)
* 2019 (wip)

## Build
```bash
docker-compose build
```

## Run
```bash
docker-compose run app ts-node src/{year}/{day}/part{1 or 2}.ts
```
Example
```bash
docker-compose run app npm run format
docker-compose run app ts-node src/2018/day1/part1.ts
```

## Testing (using Jest)
```bash
docker-compose run app npm test
```

# Improve your skills, test your performance
This project uses the performaceLog decorator (https://github.com/mabuonomo/decorators-utils-ts)

## Install

```bash
npm install --save decorators-utils-ts
```   

## Usage

```ts
@performanceLog(true) // <-- decorator
myMethod(): boolean {
    return true
}
```
Result
```bash
Call [3ms]: myMethod() => true
```