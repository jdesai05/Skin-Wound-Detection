'use client'

export default function UserHomePage() {
  return (
    <main className="p-4 grid gap-4">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden group">
        <div className="relative">
          <div 
            className="w-full bg-center bg-no-repeat aspect-[2/1] bg-cover" 
            style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCT5oeBbNgInguhegK-vAMwTwppOMGJksUXETmzOrC_N2BSxTsDEFawn3gsr17r-KWH84-xyQZIwTSuzW5b7Fp4MDZcTgEyI093ISk3IcS5duTgpg_80OzFjksfm31_coj2M4i8Ajuyw4VJUXK4BmhTEDiRAG6zDqDEWmAIlbbYWt4aSc4QGUAZ7_UpcRPbs4f5UcdqXPq_WKr9dFF51aIHN7TjPNGvbxgbdZnLYyxjXwrb9IRnXeMCaHIMGGdyo4BNSJta7yDy8w")'}}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-white text-xl font-bold">Start a New Scan</h3>
            <p className="text-gray-200 text-sm">Get an instant analysis of your skin condition.</p>
          </div>
          <button className="absolute top-4 right-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[var(--primary-color)] text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
            <svg fill="currentColor" height="28px" viewBox="0 0 256 256" width="28px" xmlns="http://www.w3.org/2000/svg">
              <path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 @container sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div 
            className="w-full bg-center bg-no-repeat aspect-[2/1] bg-cover" 
            style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDzQfKrtnQ_htJKZp92Y4d2JonWIwpYgqxrfEQtEokrvMOOQEvDzSv2NxgRqwUOp_78yHj1jIUGsK2lQreWyRgGmH_Pz-LwHZZCPd0irrEPnOWokpgrKFKSzz4SC-mKNllAj2D1yte_0Sw5JkeRIIiFn53m8vYQ-FdpplPMZK4_SKv1-5wrWdnWNf-aBL9aLpgv-YX1Kr9YXOJNvMPJEbGo70g-yTqlW1W5AG3pXl_pQNoWMdzGJEnSoBhk7Jec5H7TGS2mNQGdnA")'}}
          ></div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-[var(--text-primary)] text-lg font-bold">Learn About Skin Health</h3>
            <p className="text-[var(--text-secondary)] text-sm mt-1 flex-grow">Explore articles and tips for maintaining healthy skin.</p>
            <button className="flex mt-4 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[var(--secondary-color)] text-[var(--text-primary)] text-sm font-medium hover:bg-gray-200 self-start">
              <span className="truncate">Explore</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div 
            className="w-full bg-center bg-no-repeat aspect-[2/1] bg-cover" 
            style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvjgWzfErofeYItoT41989oQIpQZFuQ_8q0iLIcuNCjK4WxqMqnbb-JygzosV5XAJWPA9hx5oHNoYuIsx_IsRIpPNcdPz9ej00gn6lGPx2sP9FMmWdWgc3tK_iehDnaULjvqxXPQWmxzEuMDGyuFE_38X8gxxwwJxBQiWsqSG9V0TM0WXFoXPj1BI44oO6XnGxXFFZWOi1DalFk5jNanIvvAT2xA9iFev7zsTGQy8XuVs3isMmjqkYEdaOXDLZ2gaq0yI10mq6bQ")'}}
          ></div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-[var(--text-primary)] text-lg font-bold">Treatment Guidance</h3>
            <p className="text-[var(--text-secondary)] text-sm mt-1 flex-grow">Find basic OTC product information for common skin conditions.</p>
            <button className="flex mt-4 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[var(--secondary-color)] text-[var(--text-primary)] text-sm font-medium hover:bg-gray-200 self-start">
              <span className="truncate">View</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col sm:col-span-2">
          <div 
            className="w-full bg-center bg-no-repeat aspect-[2/1] sm:aspect-[4/1] bg-cover" 
            style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBp5tkk6FpNlbVb5KgKjXaOvflY36d_n6mLgjQ03ea_SfAUDeT5TywxylaslXzuUhBZn9NnR277Ft7dSWOqKq0pos0VjI_FQoxf5hIvgktUpB6rpjRnitBSC6auyZvUyG1cB6ZULZNoXI9PvqI8SlX_PIoMs2dZpXlj2CpfvSQdya8OYTEen4N89YTb97tLi-Na-S-CZu46mgiiDO5S-q6xLmA1216vDpLbPEIBhed6kxLUp4GHSBw82dHaTP_Df3Q-f1tKGcPrhg")'}}
          ></div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-[var(--text-primary)] text-lg font-bold">Find Nearby Help</h3>
            <p className="text-[var(--text-secondary)] text-sm mt-1 flex-grow">Locate telemedicine services or clinics in your area.</p>
            <button className="flex mt-4 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[var(--secondary-color)] text-[var(--text-primary)] text-sm font-medium hover:bg-gray-200 self-start">
              <span className="truncate">Find</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
