import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components';
import { useLanguage } from '@/i18n';
import { DropdownCard1 } from '@/partials/dropdowns/general';

const Highlights = () => {
  const { isRTL } = useLanguage();
  
  // ✅ Get the current month dynamically
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });

  // ✅ Key items with percentages
  const items = [
    { badgeColor: 'bg-green-500', label: 'Seminar Attendance', percentage: '90%' },
    { badgeColor: 'bg-red-500', label: 'Concept Note Submission', percentage: '70%' },
    { badgeColor: 'bg-blue-500', label: 'Proposal Submission', percentage: '50%' },
  ];

  // ✅ Render each item with better spacing and hover effect
  const renderItem = (item, index) => {
    return (
      <div 
        key={index} 
        className="flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${item.badgeColor}`}></span>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.label}</span>
        </div>
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.percentage}</span>
      </div>
    );
  };

  return (
    <div className="card h-full shadow-lg border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900">
      {/* ✅ Card Header - Styled */}
      <div className="card-header flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="card-title text-lg font-semibold text-gray-900 dark:text-gray-100">Highlights</h3>



        {/* <Menu>
          <MenuItem
            toggle="dropdown"
            trigger="click"
            dropdownProps={{
              placement: isRTL() ? 'bottom-start' : 'bottom-end',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: isRTL() ? [0, -10] : [0, 10],
                  },
                },
              ],
            }}
          >
            <MenuToggle className="btn btn-sm btn-icon btn-light btn-clear hover:bg-gray-200 dark:hover:bg-gray-800">
              <KeenIcon icon="dots-vertical" />
            </MenuToggle>
            {DropdownCard1()}
          </MenuItem>
        </Menu> */}


        
      </div>

      {/* ✅ Card Body */}
      <div className="card-body flex flex-col gap-6 p-5 lg:p-7.5">
        {/* ✅ Upper Part (Maintained & Styled) */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-normal text-gray-700 dark:text-gray-300">Monthly Key Highlights</span>

          <div className="flex items-center gap-3">
            {/* ✅ Dynamic Month with Style */}
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{currentMonth}</span>
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-lg shadow-md">Active</span>
          </div>
        </div>

        {/* ✅ Progress Bars Styled */}
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-green-500 h-2 w-full max-w-[60%] rounded-full transition-all duration-300"></div>
          <div className="bg-yellow-500 h-2 w-full max-w-[25%] rounded-full transition-all duration-300"></div>
          <div className="bg-blue-500 h-2 w-full max-w-[15%] rounded-full transition-all duration-300"></div>
        </div>

        {/* ✅ Only the 3 required items with better spacing */}
        <div className="flex flex-col gap-2">{items.map(renderItem)}</div>
      </div>
    </div>
  );
};

export { Highlights };
