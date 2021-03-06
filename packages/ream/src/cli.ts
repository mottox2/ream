#!/usr/bin/env node
import { cac } from 'cac'

const cli = cac()

cli
  .command('[dir]', 'Serve a directory in dev mode', {
    ignoreOptionDefaultValue: true,
  })
  .option('--no-cache', 'Disable webpack caching')
  .option('--port <port>', 'Server port')
  .option('--target <target>', `Build target`)
  .action(async (dir, options) => {
    const { Ream } = await import('./')
    const app = new Ream({
      dir,
      dev: true,
      cache: options.cache,
      target: options.target,
      server: {
        port: options.port
      },
    })
    await app.serve()
  })

cli.command('build [dir]', 'Build a directory for production', {
  ignoreOptionDefaultValue: true
})
.option('--target <target>', `Build target`)
.option('--no-cache', 'Disable webpack caching')
.action(async (dir, options) => {
  const { Ream } = await import('./')
  const app = new Ream({
    dir,
    dev: false,
    target: options.target,
    cache: options.cache
  })
  await app.build()
})

cli.command('start [dir]', 'Start a production server')
.option('--port <port>', 'Server port')
.action(async (dir, options) => {
  const { Ream } = await import('./')
  const app = new Ream({
    dir,
    dev: false,
    server: {
      port: options.port
    }
  })
  await app.serve()
})

cli.version(require('../package').version)
cli.help()
cli.parse()
