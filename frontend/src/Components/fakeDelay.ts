export default async function fakeDelay(delay = 1000) {
    const promise = new Promise((resolve) => setTimeout(() => resolve(true), delay));

    await Promise.resolve(promise);
}