// CONSTANTES
export const urlArticulos = 'https://tiendapwa.herokuapp.com/api/articulos/';
export const urlClientes = 'https://tiendapwa.herokuapp.com/api/clientes/';


// OPERACIONES CRUD
export async function create(URL, objeto) {
    const res =
        await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objeto)
        });
    return await res.json();
}

export async function read (URL) {
    const res
        = await fetch(URL);
    return await res.json();
}

export async function update(URL, id, objeto) {
    const res =
        await fetch(URL + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objeto)
        });
    return await res.json();
}

export async function del (URL, id) {
    const res =
        await fetch(URL + id, { method: "DELETE" });
    return await res.json();
}
