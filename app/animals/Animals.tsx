'use client';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { Animal } from '../../database/animals';

export type AnimalResponse = {
  animals: Animal[];
};

const getAnimal = gql`
  query GetAnimals {
    animals {
      id
      firstName
      type
      accessory
    }
  }
`;

export default function Animals() {
  const { loading, error, data, refetch } = useQuery(getAnimal, {
    onCompleted: async () => {
      await refetch;
    },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Animals</h1>

      {data?.animals.map((animal: Animal) => {
        console.log(`/images/${animal.id}-${animal.firstName.toLowerCase()}`);
        return (
          <div
            data-test-id={`animal-type-${animal.type}`}
            key={`animal-${animal.id}`}
          >
            <h2>
              <Link href={`/animals/${animal.id}`}>{animal.firstName}</Link>
            </h2>

            <Link href={`/animals/${animal.id}`}>
              <Image
                src={`/images/${
                  animal.id
                }-${animal.firstName.toLowerCase()}.jpeg`}
                alt=""
                width="200"
                height="200"
              />
            </Link>

            <p>Type: {animal.type}</p>
            <p>Accessory: {animal.accessory}</p>
          </div>
        );
      })}
    </>
  );
}
