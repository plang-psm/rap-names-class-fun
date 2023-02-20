document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest() {
    const rapperName = document.querySelector('input').value
    try {
        const res = await fetch(`https://plang-psm.github.io/rap-names-class-fun/api/${rapperName}`)
        const data = await res.json()

        console.log(data)
        document.querySelector('h2').innerText = data.birthName
    } catch (err) {
        console.log(err)
    }
}