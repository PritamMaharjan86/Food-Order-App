import { IoIosMan, IoMdCart } from "react-icons/io";
import { IoBarChart, IoBagHandle,IoFastFoodSharp } from "react-icons/io5";


const Dashboard = ({ orders, product }) => {

    const totalSales = orders.reduce((total, order) => {
        const orderTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return total + orderTotal;
    }, 0);

    const delivered = orders.filter(order => order.status === 'Delivered').length;

    const totalCustomer = new Set(
        orders.map(order => order.customer.name && order.customer.address && order.customer.phone)
    ).size;

    const totalProducts = new Set(product?.map(p => p.name) || []).size;



    return (
        <>
            <h1 className="text-black font-semibold text-2xl fixed bg-white w-11/12 h-15 p-4 rounded-lg shadow-md">
                Dashboard
            </h1>
            <div className='mt-20 m-10 flex flex-row justify-around gap-4'>
                <div className='border shadow-xl text-gray-600 border-blue-500 w-1/4 p-2 h-1/5 rounded-lg flex flex-col gap-4 items-center bg-blue-300'>
                    <span className="text-3xl pt-2 "><IoBagHandle /></span>                    <p className=' font-bold text-xl'>Orders</p>
                    <p className=' font-medium text-xl'>{orders.length}</p>
                    <p className='font-normal text-sm'>Total order recieved</p>
                </div>
                <div className='border shadow-xl border-green-500 text-gray-600 w-1/4 p-2 h-1/5 rounded-lg flex flex-col gap-4 items-center bg-green-300'>
                    <span className="text-3xl pt-2 "><IoIosMan /></span>
                    <p className=' font-bold text-xl'>Customers</p>
                    <p className='font-medium text-xl'>{totalCustomer}</p>
                    <p className=' font-normal text-sm'>Numbers of customer</p>
                </div>
                <div className='border shadow-xl text-gray-600 border-purple-500 w-1/4 p-2 h-1/5 rounded-lg flex flex-col gap-4 items-center bg-purple-300'>
                    <span className="text-3xl pt-2 "><IoMdCart /></span>                    <p className=' font-bold text-xl'>Delivered</p>
                    <p className='font-medium text-xl'>{delivered}</p>
                    <p className=' font-normal text-sm'>Overall products sold</p>
                </div>

                <div className='border shadow-xl text-gray-600 border-red-500 w-1/4 p-2 h-1/5 rounded-lg flex flex-col gap-4 items-center bg-red-300'>
                    <span className="text-3xl pt-2 "><IoBarChart /></span>                    <p className=' font-bold text-xl'>Sales</p>
                    <p className=' font-medium text-xl'>${totalSales.toFixed(2)}</p>
                    <p className=' font-normal text-sm'>Total income earned</p>
                </div>

                <div className='border shadow-xl text-gray-600 border-yellow-500 w-1/4 p-2 h-1/5 rounded-lg flex flex-col gap-4 items-center bg-yellow-300'>
                    <span className="text-3xl pt-2 "><IoFastFoodSharp /></span>                    <p className=' font-bold text-xl'>Products</p>
                    <p className=' font-medium text-xl'>{totalProducts}</p>
                    <p className=' font-normal text-sm'>Active products on website</p>
                </div>

            </div>
        </>
    )
}

export default Dashboard
