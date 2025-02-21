import React, { useEffect, useMemo, useState } from 'react';

/* eslint-disable prettier/prettier */
import { useLanguage } from '@/i18n';
import { toAbsoluteUrl } from '@/utils';
import {
  DataGrid,
  DataGridColumnHeader,
  DataGridColumnVisibility,
  DataGridRowSelect,
  DataGridRowSelectAll,
  KeenIcon,
  useDataGrid,
  Menu,
  MenuItem,
  MenuToggle
} from '../../../components';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { DropdownCard1 } from '@/partials/dropdowns/general';
import { MembersData } from '@/pages/account/members/team-members/blocks/members/MembersData';

const SupervisorPageList = () => {
  const { isRTL } = useLanguage();

  // -----------------------------
  // CRUD handlers (placeholders)
  // -----------------------------
  const handleCreate = () => {
    // Show a modal or navigate to a form to create a new Supervisor
    // e.g., openCreateModal();
    toast('Create Supervisor button clicked!');
  };

  const handleEdit = (rowData) => {
    // Show a modal or navigate to a form to edit the rowData
    // e.g., openEditModal(rowData);
    toast(`Edit action on: ${rowData.member.name}`);
  };

  const handleDelete = (rowData) => {
    // Show a confirmation dialog and then delete the rowData
    // e.g., openDeleteConfirmation(rowData);
    toast(`Delete action on: ${rowData.member.name}`);
  };

  // Filter storage key
  const storageFilterId = 'members-filter';

  // Filter input for columns
  const ColumnInputFilter = ({ column }) => {
    return (
      <Input
        placeholder="Filter..."
        value={column.getFilterValue() ?? ''}
        onChange={(event) => column.setFilterValue(event.target.value)}
        className="h-9 w-full max-w-40"
      />
    );
  };

  // -----------------------------
  // DataGrid columns
  // -----------------------------
  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: () => <DataGridRowSelectAll />,
      cell: ({ row }) => <DataGridRowSelect row={row} />,
      enableSorting: false,
      enableHiding: false,
      meta: {
        headerClassName: 'w-0'
      }
    },
    {
      accessorFn: (row) => row.member,
      id: 'member',
      header: ({ column }) => (
        <DataGridColumnHeader
          title="Member"
          filter={<ColumnInputFilter column={column} />}
          column={column}
        />
      ),
      enableSorting: true,
      cell: (info) => (
        <div className="flex items-center gap-2.5">
          <div className="shrink-0">
            <img
              src={toAbsoluteUrl(`/media/avatars/${info.row.original.member.avatar}`)}
              className="h-9 rounded-full"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <a
              className="leading-none font-medium text-sm text-gray-900 hover:text-primary"
              href="#"
            >
              {info.row.original.member.name}
            </a>
            <span className="text-2sm text-gray-700 font-normal">
              {info.row.original.member.tasks} tasks
            </span>
          </div>
        </div>
      ),
      meta: {
        headerClassName: 'min-w-[300px]',
        cellClassName: 'text-gray-700 font-normal'
      }
    },
    {
      accessorFn: (row) => row.roles,
      id: 'roles',
      header: ({ column }) => (
        <DataGridColumnHeader
          title="Roles"
          column={column}
        />
      ),
      enableSorting: true,
      cell: (info) => (
        <div className="flex flex-wrap gap-2.5 mb-2">
          {info.row.original.roles.map((role, index) => (
            <span key={index} className="badge badge-sm badge-light badge-outline">
              {role}
            </span>
          ))}
        </div>
      ),
      meta: {
        headerClassName: 'min-w-[165px]'
      }
    },
    {
      accessorFn: (row) => row.location,
      id: 'location',
      header: ({ column }) => (
        <DataGridColumnHeader
          title="Location"
          column={column}
        />
      ),
      enableSorting: true,
      cell: (info) => (
        <div className="flex items-center gap-1.5">
          <img
            src={toAbsoluteUrl(`/media/flags/${info.row.original.location.flag}`)}
            className="h-4 rounded-full"
            alt=""
          />
          <span className="leading-none text-gray-800 font-normal">
            {info.row.original.location.name}
          </span>
        </div>
      ),
      meta: {
        headerClassName: 'min-w-[165px]',
        cellClassName: 'text-gray-700 font-normal'
      }
    },
    {
      accessorFn: (row) => row.status,
      id: 'status',
      header: ({ column }) => (
        <DataGridColumnHeader
          title="Status"
          column={column}
        />
      ),
      enableSorting: true,
      cell: (info) => (
        <span className={`badge badge-sm badge-outline  ${info.row.original.status.variant}`}>
          {info.row.original.status.label}
        </span>
      ),
      meta: {
        headerClassName: 'min-w-[165px]',
        cellClassName: 'text-gray-700 font-normal'
      }
    },
    {
      accessorFn: (row) => row.recentlyActivity,
      id: 'recentlyActivity',
      header: ({ column }) => (
        <DataGridColumnHeader
          title="Recent activity"
          column={column}
        />
      ),
      enableSorting: true,
      cell: (info) => info.getValue(),
      meta: {
        headerTitle: 'Recent activity',
        headerClassName: 'min-w-[165px]',
        cellClassName: 'text-gray-700 font-normal'
      }
    },
    // Actions column
    {
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <div className="flex items-center gap-2">
            <button
              className="btn btn-xs btn-light-primary"
              onClick={() => handleEdit(rowData)}
            >
              <KeenIcon icon="pencil" className="me-1" />
              Edit
            </button>
            <button
              className="btn btn-xs btn-light-danger"
              onClick={() => handleDelete(rowData)}
            >
              <KeenIcon icon="trash" className="me-1" />
              Delete
            </button>
          </div>
        );
      },
      meta: {
        headerClassName: 'min-w-[120px] text-center'
      }
    },
    {
      id: 'click',
      header: () => '',
      enableSorting: false,
      cell: () => (
        <Menu className="items-stretch">
          <MenuItem
            toggle="dropdown"
            trigger="click"
            dropdownProps={{
              placement: isRTL() ? 'bottom-start' : 'bottom-end',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: isRTL() ? [0, -10] : [0, 10] // [skid, distance]
                  }
                }
              ]
            }}
          >
            <MenuToggle className="btn btn-sm btn-icon btn-light btn-clear">
              <KeenIcon icon="dots-vertical" />
            </MenuToggle>
            {DropdownCard1()}
          </MenuItem>
        </Menu>
      ),
      meta: {
        headerClassName: 'w-[60px]'
      }
    }
  ], [isRTL]);

  // -----------------------------
  // Data & search handling
  // -----------------------------
  // Memoize the team data
  const data = useMemo(() => MembersData, []);

  // Initialize search term from localStorage if available
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem(storageFilterId) || '';
  });

  // Update localStorage whenever the search term changes
  useEffect(() => {
    localStorage.setItem(storageFilterId, searchTerm);
  }, [searchTerm]);

  // Filtered data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((member) =>
      member.member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.member.tasks.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  // Handle row selection
  const handleRowSelection = (state) => {
    const selectedRowIds = Object.keys(state);
    if (selectedRowIds.length > 0) {
      toast(`Total ${selectedRowIds.length} selected.`, {
        description: `Selected row IDs: ${selectedRowIds}`,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo')
        }
      });
    }
  };

  // -----------------------------
  // Toolbar component
  // -----------------------------
  const Toolbar = () => {
    const { table } = useDataGrid();
    return (
      <div className="card-header px-5 py-5 border-b-0 flex-wrap gap-2 justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="card-title">All Supervisors</h3>
          {/* Example: Add a new Supervisor */}
          <button
            className="btn btn-sm btn-primary ms-3"
            onClick={handleCreate}
          >
            <KeenIcon icon="plus" className="me-1" />
            Add Supervisor
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <KeenIcon
              icon="magnifier"
              className="leading-none text-md text-gray-500 absolute top-1/2 start-0 -translate-y-1/2 ms-3"
            />
            <input
              type="text"
              placeholder="Search Members"
              className="input input-sm ps-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          <DataGridColumnVisibility table={table} />
          <label className="switch switch-sm">
            <input
              name="check"
              type="checkbox"
              value="1"
              className="order-2"
              readOnly
            />
            <span className="switch-label order-1">Active Users</span>
          </label>
        </div>
      </div>
    );
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <DataGrid
      columns={columns}
      data={filteredData}
      rowSelection={true}
      onRowSelectionChange={handleRowSelection}
      pagination={{ size: 10 }}
      sorting={[{ id: 'member', desc: false }]}
      toolbar={<Toolbar />}
      layout={{ card: true }}
    />
  );
};

export default SupervisorPageList;
