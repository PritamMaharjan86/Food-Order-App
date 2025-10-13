import React from 'react'

const Banner = () => {
    return (
        <div class="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">

            <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80"
                alt="Delicious food"
                class="w-full h-full object-cover"
            />


            <div class="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start px-6 md:px-20">
                <h1 class="text-3xl md:text-5xl font-bold text-white mb-4">Delicious Meals Delivered Fast!</h1>
                <p class="text-lg md:text-2xl text-white mb-6">Order your favorite dishes and enjoy them at home.</p>

            </div>
        </div>

    )
}

export default Banner
