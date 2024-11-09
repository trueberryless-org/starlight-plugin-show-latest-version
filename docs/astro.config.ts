import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightCoolerCredit from 'starlight-cooler-credit'

export default defineConfig({
  integrations: [
    starlight({
      editLink: {
        baseUrl: 'https://github.com/trueberryless-org/starlight-cooler-credit/edit/main/docs/',
      },
      plugins: [starlightCoolerCredit()],
      sidebar: [
        {
          label: 'Start Here',
          items: [{ slug: 'getting-started' }],
        },
      ],
      social: {
        github: 'https://github.com/trueberryless-org/starlight-cooler-credit',
      },
      title: 'starlight-cooler-credit',
    }),
  ],
})
