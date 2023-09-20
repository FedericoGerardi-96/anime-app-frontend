'use client';
import {
  ChangeEvent,
  Key,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Pagination,
  SortDescriptor,
  Spinner,
} from '@nextui-org/react';
import useSWR from 'swr';
import { useMediaQuery } from 'usehooks-ts';

import { SearchIcon, ThreePointVertical } from '../../utils';
import { ISeasonAnime } from '../../interface';
import { getAnimeSeason } from '../../services/myAnimeList/myAnimeList.service';

interface columnProps {
  name: string;
  uid: string;
  sortable: boolean;
}

const columns = [
  { name: 'ID', uid: 'id', sortable: false },
  { name: 'Tittle', uid: 'name', sortable: true },
  { name: 'Score', uid: 'score', sortable: true },
  { name: 'Rank', uid: 'rank', sortable: true },
  { name: 'Aired', uid: 'aired', sortable: false },
  { name: 'Add', uid: 'actions', sortable: false },
];
const columnsMobile = [
  { name: 'Tittle', uid: 'name', sortable: true },
  { name: 'Add', uid: 'actions', sortable: false },
];

export const SeasonAnimeTable = () => {
  const mobileQuery = useMediaQuery('(max-width: 768px)');
  // pagination
  const [page, setPage] = useState(1);
  const [columnKeys, setcolumnKeys] = useState<columnProps[]>(
    mobileQuery ? columnsMobile : columns
  );
  const [filterValue, setFilterValue] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'tittle',
    direction: 'ascending',
  });

  const { data, isLoading, error } = useSWR<ISeasonAnime>(
    `/${page}/${rowsPerPage}`,
    getAnimeSeason,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (error) return <div>failed to load</div>;

  const [TotalPage, setTotalPage] = useState<number>(0);

  useEffect(() => {
    if (!data) return;
    setTotalPage(data.pagination.last_visible_page);
  }, [data]);

  useEffect(() => {
    setcolumnKeys(mobileQuery ? columnsMobile : columns);
  }, [mobileQuery]);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    if (!data) return [];
    let filteredUsers = [...data.data];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((anime) =>
        anime.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredUsers;
  }, [data, filterValue, page]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column as keyof any] as number;
      const second = b[sortDescriptor.column as keyof any] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, data, filteredItems, page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue('');
    }
  }, []);

  const renderCell = useCallback((anime: any, columnKey: Key): JSX.Element => {
    switch (columnKey) {
      case 'id':
        return <p>{anime.mal_id}</p>;
      case 'name':
        return (
          <User
            avatarProps={{
              radius: 'full',
              size: mobileQuery ? 'sm' : 'lg',
              src: anime.images.webp.image_url,
            }}
            className={`${mobileQuery ? 'text-2xl' : 'text-3xl'}`}
            description={anime.title_japanese}
            name={anime.title}>
            {anime.title_japanese}
          </User>
        );
      case 'role':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-small capitalize'>{anime.title}</p>
            <p className='text-bold text-tiny capitalize text-default-500'>
              {anime.title}
            </p>
          </div>
        );
      case 'score':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-small'>{anime.score}</p>
          </div>
        );
      case 'aired':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-small'>{anime.broadcast.day || '-'}</p>
            <span className='text-bold text-small'>{anime.season || ''}</span>
          </div>
        );
      case 'rank':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-small'>{anime.rank}</p>
          </div>
        );
      case 'actions':
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button className='bg-transparent' isIconOnly>
                <ThreePointVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label='Static Actions'>
              <DropdownItem key='new'>New file</DropdownItem>
              <DropdownItem key='copy'>Copy link</DropdownItem>
              <DropdownItem key='edit'>Edit file</DropdownItem>
              <DropdownItem key='delete' className='text-danger' color='danger'>
                Delete file
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return <></>;
    }
  }, [mobileQuery]);

  const topContent = useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            classNames={{
              base: 'w-full sm:max-w-[44%]',
              inputWrapper: 'border-1',
            }}
            placeholder='Search by name...'
            size='sm'
            startContent={<SearchIcon className='text-default-300' />}
            value={filterValue}
            variant='bordered'
            onClear={() => setFilterValue('')}
            onValueChange={onSearchChange}
          />
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>
            Total {data?.pagination.items.total || 0} animes in this season
          </span>
          <label className='flex items-center text-default-400 text-small'>
            Rows per page:
            <select
              className='bg-transparent outline-none text-default-400 text-small'
              onChange={onRowsPerPageChange}>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    onRowsPerPageChange,
    hasSearchFilter,
    data?.data.length,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        {TotalPage > 0 && (
          <Pagination
            showControls
            classNames={{
              cursor: 'bg-foreground text-background',
            }}
            color='default'
            isDisabled={hasSearchFilter}
            page={page}
            total={TotalPage}
            variant='light'
            onChange={setPage}
          />
        )}
      </div>
    );
  }, [page, TotalPage]);

  const classNames = useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label='Example table with custom cells, pagination and sorting'
      classNames={classNames}
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      topContent={topContent}
      topContentPlacement='outside'
      onSortChange={setSortDescriptor}
      sortDescriptor={sortDescriptor}>
      <TableHeader columns={columnKeys}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner color='white' />}
        emptyContent={<div className='min-h-[380px]' />}
        items={sortedItems}>
        {(item) => (
          <TableRow key={item.mal_id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
