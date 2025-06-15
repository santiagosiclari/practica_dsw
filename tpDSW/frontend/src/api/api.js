/*const ALOJAMIENTOS = [
        {
            "imagen": "https://loremflickr.com/3396/2488?lock=169747908709827",
            "nombre": "nombre NaN",
            "precioPorNoche": 92,
            "id": 1
        },
        {
            "imagen": "https://picsum.photos/seed/sRIVC/2648/3739",
            "nombre": "nombre 1",
            "precioPorNoche": 24,
            "id": 2
        },
        {
            "imagen": "https://picsum.photos/seed/GPnxaB3oJI/153/1162",
            "nombre": "nombre 2",
            "precioPorNoche": 14,
            "id": 3
        },
        {
            "imagen": "https://loremflickr.com/420/2934?lock=8625482042825196",
            "nombre": "nombre 3",
            "precioPorNoche": 83,
            "id": 4
        },
        {
            "imagen": "https://loremflickr.com/651/1335?lock=3267188403968436",
            "nombre": "nombre 4",
            "precioPorNoche": 75,
            "id": 5
        },
        {
            "imagen": "https://picsum.photos/seed/TK0qIz3a/414/650",
            "nombre": "nombre 5",
            "precioPorNoche": 80,
            "id": 6
        },
        {
            "imagen": "https://picsum.photos/seed/bYTOL/344/401",
            "nombre": "nombre 6",
            "precioPorNoche": 28,
            "id": 7
        },
        {
            "imagen": "https://loremflickr.com/1564/634?lock=3193053481850784",
            "nombre": "nombre 7",
            "precioPorNoche": 10,
            "id": 8
        },
        {
            "imagen": "https://picsum.photos/seed/2qCHyLgg/2349/166",
            "nombre": "nombre 8",
            "precioPorNoche": 71,
            "id": 9
        }
]*/

const ALOJAMIENTOS = [
    {
        id: 1,
        nombre: "Pizza",
        imagen: "https://images.unsplash.com/photo-1601924582971-6e9f8d6d1e4e",
        precio: 16000
    },
    {
        id: 2,
        nombre: "Empanadas",
        imagen: "https://images.unsplash.com/photo-1617196038435-9e4f9f6e8b1e"
    },
    {
        id: 3,
        nombre: "Milanesa con papas",
        imagen: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
        precio: 18000
    },
    {
        id: 4,
        nombre: "Ravioles con tuco",
        imagen: "https://images.unsplash.com/photo-1603079841834-6e4f9f6e8b1e",
        precio: 17000}
    ]

export const getAlojamientos = () => Promise.resolve(ALOJAMIENTOS)

export const putReserva = (alojamientos) => Promise.resolve({
    estado: "OK",
    alojamientos,
})
