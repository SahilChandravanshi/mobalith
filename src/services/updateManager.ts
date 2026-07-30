import type { MobalithRepositories } from '@/services/repositories'

export type DataDomain = keyof MobalithRepositories
export type UpdateResult = { domain: DataDomain; fulfilled: boolean }
export class UpdateManager {
  constructor(private readonly repositories: MobalithRepositories) {}
  async refresh(
    domains: readonly DataDomain[] = Object.keys(
      this.repositories,
    ) as DataDomain[],
  ): Promise<UpdateResult[]> {
    return Promise.all(
      domains.map(async (domain) => {
        try {
          await this.repositories[domain].list({ force: true })
          return { domain, fulfilled: true }
        } catch {
          return { domain, fulfilled: false }
        }
      }),
    )
  }
}
