import { cn } from '@/lib/utils';
import { ArrowDownUp } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui';

interface SortPopup {
    className?: string;
}

export const SortPopup = ({ className }: SortPopup) => {
    return (
        <Popover>
            <PopoverTrigger>
                <div
                    className={cn(
                        'flex items-center gap-2 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
                        className,
                    )}
                >
                    <ArrowDownUp width={14} height={16} />
                    <b>Сортировка:</b>
                    <b className="text-primary">рейтингу</b>
                </div>
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
    );
};
