import Link from 'next/link';
import React from 'react';

export default function user({ user }) {
  console.log(user);
  return (
    <div className='container px-4 pt-5'>
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex justify-content-between'>
            <h2 className='card-title'>{user.name}</h2>
            <h4>{user.username}</h4>
          </div>
          <hr />
          <h5 className='card-subtitle'>Info : </h5>
          <ul className='list-group'>
            <li className='list-group-item'>Email: {user.email}</li>
            <li className='list-group-item'>Téléphone: {user.phone}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const id = context.params.user;

  const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await data.json();

  return {
    props: { user },
  };
}

export async function getStaticPaths() {
  const data = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await data.json();

  const paths = users.map((item) => ({
    params: { user: item.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
