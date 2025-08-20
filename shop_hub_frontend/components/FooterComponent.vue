<template>
  <footer class="bg-primary-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span class="text-primary-800 font-bold text-sm">SH</span>
            </div>
            <span class="text-xl font-bold">Shop Hub</span>
          </div>
          <p class="text-primary-200 mb-4 max-w-md">
            Your ultimate shopping destination. Discover amazing products, enjoy great deals, 
            and experience seamless shopping like never before.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-primary-200 hover:text-white transition-colors">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="#" class="text-primary-200 hover:text-white transition-colors">
              <span class="sr-only">Twitter</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
              </svg>
            </a>
            <a href="#" class="text-primary-200 hover:text-white transition-colors">
              <span class="sr-only">Instagram</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.33-1.291C3.897 14.977 3.29 13.592 3.29 12.017c0-1.576.608-2.961 1.829-3.681.882-.802 2.033-1.291 3.33-1.291 1.297 0 2.448.49 3.33 1.291 1.22.72 1.829 2.105 1.829 3.681 0 1.575-.609 2.96-1.829 3.68-.882.801-2.033 1.291-3.33 1.291zm7.83-10.147v1.613a.956.956 0 01-.96.959H13.613a.956.956 0 01-.96-.959V6.84c0-.53.429-.959.96-.959h1.707c.53 0 .959.429.959.96z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/products" class="text-primary-200 hover:text-white transition-colors">All Products</NuxtLink></li>
            <li><NuxtLink to="/categories" class="text-primary-200 hover:text-white transition-colors">Categories</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-primary-200 hover:text-white transition-colors">About Us</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-primary-200 hover:text-white transition-colors">Contact</NuxtLink></li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div>
          <h3 class="font-semibold mb-4">Customer Service</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-primary-200 hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" class="text-primary-200 hover:text-white transition-colors">Shipping Info</a></li>
            <li><a href="#" class="text-primary-200 hover:text-white transition-colors">Returns</a></li>
            <li><a href="#" class="text-primary-200 hover:text-white transition-colors">Size Guide</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-primary-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-primary-200 text-sm">
          &copy; {{ new Date().getFullYear() }} Shop Hub. All rights reserved.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-primary-200 hover:text-white text-sm transition-colors">Privacy Policy</a>
          <a href="#" class="text-primary-200 hover:text-white text-sm transition-colors">Terms of Service</a>
          <a href="#" class="text-primary-200 hover:text-white text-sm transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>
