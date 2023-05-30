export type Job = {
    id: string,
    duration: number,
    deadline: number,
    start: number,
    end: number,
}

export function minimizeLateness(jobs: Job[], startTime = 0): void {
    jobs.sort((a, b) => a.deadline - b.deadline)

    let time = startTime
    for (let i = 0; i < jobs.length; i++) {
        jobs[i].start = time
        jobs[i].end = time + jobs[i].duration
        time = time + jobs[i].duration
    }
}