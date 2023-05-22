export type Job = {
    id: string,
    duration: number,
    deadline: number,
    start: number,
    end: number,
}

export function minimizeLateness(jobs: Job[]): void {
    jobs.sort((a, b) => a.deadline - b.deadline)

    let time = 0
    for (let i = 1; i < jobs.length; i++) {
        jobs[i].start = time
        jobs[i].end = time + jobs[i].duration
        time = time + jobs[i].duration
    }
}