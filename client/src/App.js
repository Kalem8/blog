import './App.css';

function App() {
  return (
    <main>
      <header>
        <a href="" className="logo"> MyBlog </a>
        <nav>
          <a href="">Login</a>
          <a href="">Register</a>
        </nav>
      </header>

      <div className="post">
        <div className="image">
          <img src="https://techcrunch.com/wp-content/uploads/2014/10/money-cash-money-cash.jpg?w=1390&crop=1" alt="" />
        </div>
        <div className="texts">
          <h2>Lorem, ipsum.</h2>
          <p className='info'>
            <a className='author'> Yunus Yildiz </a>
            <time>2023 01-06 16:45</time>
          </p>
          <p className='summary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolores eaque dignissimos, natus labore,
            quas alias obcaecati vero non unde sit aut animi illo repudiandae!</p>
        </div>
      </div>

      <div className="post">
        <div className="image">
          <img src="https://techcrunch.com/wp-content/uploads/2014/10/money-cash-money-cash.jpg?w=1390&crop=1" alt="" />
        </div>
        <div className="texts">
          <h2>Lorem, ipsum.</h2>
          <p className='info'>
            <a className='author'> Yunus Yildiz </a>
            <time>2023 01-06 16:45</time>
          </p>
          <p className='summary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolores eaque dignissimos, natus labore,
            quas alias obcaecati vero non unde sit aut animi illo repudiandae!</p>
        </div>
      </div>

      <div className="post">
        <div className="image">
          <img src="https://techcrunch.com/wp-content/uploads/2014/10/money-cash-money-cash.jpg?w=1390&crop=1" alt="" />
        </div>
        <div className="texts">
          <h2>Lorem, ipsum.</h2>
          <p className='info'>
            <a className='author'> Yunus Yildiz </a>
            <time>2023 01-06 16:45</time>
          </p>
          <p className='summary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolores eaque dignissimos, natus labore,
            quas alias obcaecati vero non unde sit aut animi illo repudiandae!</p>
        </div>
      </div>

    </main>
  )
}

export default App;
