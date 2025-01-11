import { cn } from '@/lib/utils';
import { useSet } from 'react-use';
import { Title } from './title';
import { Button } from '../ui';
import { ProductPizzaImage } from './pizza-image';
import { GroupVariants } from './group-variants';
import {
    PizzaSizesType,
    pizzaSizes,
    PizzaTypesType,
    pizzaTypes,
    mapPizzaType,
} from '@/constants/pizza';
import { useEffect, useState } from 'react';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './ingredient-item';

interface ChoosePizzaFormProps {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    loading?: boolean;
    onSubmit?: (itemId: number, ingredients: number[]) => void;
    className?: string;
}

export const ChoosePizzaForm = ({
    name,
    items,
    imageUrl,
    ingredients,
    loading,
    onSubmit,
    className,
}: ChoosePizzaFormProps) => {
    const [size, setSize] = useState<PizzaSizesType>(25);
    const [type, setType] = useState<PizzaTypesType>(1);
    const [selectedValues, { toggle: toggleIngredients }] = useSet(
        new Set<number>([]),
    );

    const pizzaPrice =
        items.find((item) => item.pizzaType === type && item.size === size)
            ?.price || 0;

    const ingredientsPrice = ingredients
        .filter((item) => selectedValues.has(item.id))
        .reduce((acc, item) => {
            return acc + item.price;
        }, 0);

    const availablePizzas = items.filter((item) => item.pizzaType === type);

    const availablePizzasSizes = pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !availablePizzas.some(
            (pizza) => Number(pizza.size) === Number(item.value),
        ),
    }));

    const onClickType = (value: string) => {
        setType(Number(value) as PizzaTypesType);
    };

    const onClickSize = (value: string) => {
        setSize(Number(value) as PizzaSizesType);
    };

    const handleClickAdd = () => {
        console.log({
            size,
            type,
            ingredients,
        });
    };

    useEffect(() => {
        const isAvailableSize = availablePizzasSizes.find(
            (item) => item.value === String(size) && !item.disabled,
        );
        const availableSize = availablePizzasSizes.find(
            (item) => !item.disabled,
        );

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSizesType);
        }
    }, [type]);

    return (
        <div className={cn(className, 'flex flex-1 ')}>
            <ProductPizzaImage imageUrl={imageUrl} size={size} />
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <div className=" h-[420px] overflow-auto scrollbar mr-2">
                    <Title text={name} size="md" className="font-bold mb-1" />
                    <p className="text-gray-400">{`${size} см, ${mapPizzaType[type].toLowerCase()} пицца`}</p>
                    <div className="flex flex-col gap-2 mt-3">
                        <GroupVariants
                            items={availablePizzasSizes}
                            value={String(size)}
                            onClick={(value) => onClickSize(value)}
                        />
                        <GroupVariants
                            items={pizzaTypes}
                            value={String(type)}
                            onClick={(value) => onClickType(value)}
                        />
                    </div>

                    <Title
                        text="Добавить по вкусу"
                        size="sm"
                        className="font-bold mt-4"
                    />

                    <div className="grid grid-cols-3 gap-3 bg-gray-50 p-5 rounded-md mt-2">
                        {ingredients.map((item) => (
                            <IngredientItem
                                key={item.id}
                                name={item.name}
                                price={item.price}
                                imageUrl={item.imageUrl}
                                onClick={() => toggleIngredients(item.id)}
                                active={selectedValues.has(item.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button
                    onClick={handleClickAdd}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                >
                    Добавить в корзину за {pizzaPrice + ingredientsPrice} руб.
                </Button>
            </div>
        </div>
    );
};
