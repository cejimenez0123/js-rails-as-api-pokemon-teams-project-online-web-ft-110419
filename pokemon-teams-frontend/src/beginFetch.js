async function beginFetch() {
    const resp = await fetch(TRAINERS_URL);
    const obj = await resp.json();
    return addTrainers(obj);
}
