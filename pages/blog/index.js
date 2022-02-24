import Link from 'next/link';
import { v4 } from 'uuid';

export default function index({ articles }) {
  return (
    <div className='container px-4 py-5'>
      <h1 className='text-center'>Bienvenue sur le Blog</h1>
      <p className='text-center'>Voici les articles</p>

      <div className='row g-3 mt-4'>
        {articles.map((article) => (
          <div className='col-12 col-md-6 col-xl-4' key={v4()}>
            <div className='card h-100 shadow-sm'>
              <div className='card-body'>
                <h5 className='card-title'>{article.title}</h5>
                <p className='card-text'>{article.body.slice(0, 20) + '...'}</p>
                <Link href={`/blog/${article.id.toString()}`}>
                  <a className='card-link'>Lire cet article</a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const articles = await data.json();

  return {
    props: {
      articles,
    },
  };
}
// https://jsonplaceholder.typicode.com/posts
