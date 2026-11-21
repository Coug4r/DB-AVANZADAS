import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
interface ProductoData {
    nombre: string,
    precio: number,
    stock: number
}
const guardarProducto = async ({nombre, precio, stock}: ProductoData) => {
    try {
      const docRef = await addDoc(collection(db, "productos"), {
        nombre,
        precio: Number(precio),
        stock: Number(stock),
      });
      console.log("Producto creado: ", docRef.id)
    } catch (error) {
      console.log("Error: " + error)
    }
  }
export default guardarProducto