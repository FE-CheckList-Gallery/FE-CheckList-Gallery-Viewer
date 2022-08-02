import {useState, useEffect} from 'react'

export default function Home() {
  const [a, setA] = useState('');
  useEffect(() => {
    setA('hello')
  }, []);
  return <div>{a}</div>;
}
