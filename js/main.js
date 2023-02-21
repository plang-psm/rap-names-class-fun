document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
    const rapperName = document.querySelector('input').value
    try{
        const res = await fetch(`https://rap-names-class-fun-uh4e.onrender.com//api/${rapperName}`)
        const data = await res.json()

        console.log(data)
        document.querySelector('h2').innerText = data.birthName
    }catch(error){
        console.log(error)
    }
}