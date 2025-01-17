import {
    PizzaSizesType,
    PizzaTypesType,
    mapPizzaType,
    pizzaTypes,
} from '@/constants/pizza';
import { usePizzaOptions } from '@/hook';
import { calcTotalPizzaPrice } from '@/lib/calc-total-pizza-price';
import { cn } from '@/lib/utils';
import { Ingredient, ProductItem } from '@prisma/client';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { IngredientItem } from './ingredient-item';
import { ProductPizzaImage } from './pizza-image';
import { Title } from './title';

interface ChoosePizzaFormProps {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    loading?: boolean;
    onSubmit: (itemId: number, ingredients: number[]) => void;
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
    const {
        type,
        setType,
        size,
        setSize,
        availablePizzasSizes,
        toggleIngredients,
        selectedValues,
        currentItemId,
    } = usePizzaOptions(items);

    const totalPrice = calcTotalPizzaPrice(
        type,
        size,
        items,
        ingredients,
        selectedValues,
    );

    const handleClickAdd = () => {
        if (currentItemId) {
            onSubmit(currentItemId, Array.from(selectedValues));
        }
    };

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
                            onClick={(value) =>
                                setSize(Number(value) as PizzaSizesType)
                            }
                        />
                        <GroupVariants
                            items={pizzaTypes}
                            value={String(type)}
                            onClick={(value) =>
                                setType(Number(value) as PizzaTypesType)
                            }
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
                    Добавить в корзину за {totalPrice} руб.
                </Button>
            </div>
        </div>
    );
};
