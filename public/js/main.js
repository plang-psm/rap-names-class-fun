const likeIcon = document.querySelectorAll('.fa-rocket')
const deleteText = document.querySelectorAll('.fa-thumbs-down')

Array.from(likeIcon).forEach((element)=>{
    element.addEventListener('click', addLike)
})

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteRapper)
})

async function addLike() {
    const rName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const rLikes = Number(this.parentNode.childNodes[5].innerText)
    try {
        const res = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'rapperNameS': rName,
                'birthNameS': bName,
                'likesS': rLikes
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function deleteRapper() {
    const rName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    try {
        const res = await fetch('deleteRapper', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'rapperNameS': rName,
                'birthNameS': bName
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}
