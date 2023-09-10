import { useQuery } from '@tanstack/react-query';

import { findGardenByUserId } from '@/api/garden';

import useGardenStore from '@/stores/gardenStore';

import { RawGardenInfo } from '@/types/data';

import { createInventory } from '@/utils/createInventory';

const useSyncGarden = (id: string) => {
  const { point, setPoint, setShop, setInventory, setPlants } =
    useGardenStore();

  const syncGarden = (garden: RawGardenInfo) => {
    const { point, products, plantObjs } = garden;

    const newInventory = createInventory(plantObjs);

    setPoint(point.score);
    setShop(products);
    setInventory(newInventory);
    setPlants(plantObjs);
  };

  const { isLoading, isError } = useQuery<RawGardenInfo>(
    ['garden'],
    () => findGardenByUserId(id),
    {
      onSuccess: (garden) => syncGarden(garden),
    },
  );

  return { isLoading, isError, point };
};

export default useSyncGarden;
