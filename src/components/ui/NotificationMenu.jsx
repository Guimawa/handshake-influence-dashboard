import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from './dropdown-menu';

/**
 * Composant NotificationMenu
 * Zone 11 - MENU NOTIFICATIONS selon spécifications
 */

const NotificationMenu = ({ 
  notifications = [],
  onNotificationClick,
  onMarkAllRead,
  onClearAll
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification) => {
    onNotificationClick && onNotificationClick(notification);
    setIsOpen(false);
  };

  const handleMarkAllRead = () => {
    onMarkAllRead && onMarkAllRead();
  };

  const handleClearAll = () => {
    onClearAll && onClearAll();
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="notif-btn relative flex items-center focus-visible:ring-2 focus-visible:ring-[#3B82F6] transition-all duration-120 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.04]"
          aria-label="Notifications"
          tabIndex="0"
        >
          <svg className="text-2xl text-[#AAB7C6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {unreadCount > 0 && (
            <span 
              className="badge absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] text-xs text-white rounded-full flex items-center justify-center font-bold animate-pop-badge" 
              aria-live="polite"
            >
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-80 bg-[#232B3E] border-[#222C3B] text-[#F1F5F9]"
        align="end"
        sideOffset={8}
      >
        <div className="p-4 border-b border-[#222C3B]">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#F1F5F9]">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-[#3B82F6] hover:text-[#2563eb] transition-colors"
              >
                Marquer tout comme lu
              </button>
            )}
          </div>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-[#AAB7C6]">
              Aucune notification
            </div>
          ) : (
            notifications.map((notification, index) => (
              <DropdownMenuItem
                key={notification.id || index}
                className={`p-4 hover:bg-[#222C3B] cursor-pointer ${
                  !notification.read ? 'bg-[#222C3B]/50' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    !notification.read ? 'bg-[#3B82F6]' : 'bg-transparent'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#F1F5F9]">
                      {notification.title}
                    </p>
                    <p className="text-xs text-[#AAB7C6] mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-[#AAB7C6] mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
        
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator className="bg-[#222C3B]" />
            <div className="p-2">
              <button
                onClick={handleClearAll}
                className="w-full text-xs text-[#EF4444] hover:text-[#DC2626] transition-colors text-center py-2"
              >
                Effacer tout
              </button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMenu;
