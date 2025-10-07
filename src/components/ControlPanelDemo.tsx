'use client';

import { useState } from "react";

export default function ControlPanelDemo() {
  const [activeTab, setActiveTab] = useState('servers');

  const renderContent = () => {
    switch (activeTab) {
      case 'network':
        return (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="group rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 text-center hover:from-blue-50 hover:to-blue-100 transition-all duration-300 hover:scale-105">
                <div className="text-xs text-slate-500 mb-2">Gelen Trafik</div>
                <div className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors duration-300">2.4 GB/s</div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-1000" style={{width: '75%'}}></div>
                </div>
              </div>
              <div className="group rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 text-center hover:from-green-50 hover:to-green-100 transition-all duration-300 hover:scale-105">
                <div className="text-xs text-slate-500 mb-2">Giden Trafik</div>
                <div className="text-2xl font-bold text-slate-900 group-hover:text-green-700 transition-colors duration-300">1.8 GB/s</div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 rounded-full transition-all duration-1000" style={{width: '60%'}}></div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Bandwidth Kullanımı</span>
                <span className="text-sm font-semibold text-slate-900">4.2 TB / 5 TB</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Aktif Bağlantılar</span>
                <span className="text-sm font-semibold text-slate-900">1,247</span>
              </div>
            </div>
          </div>
        );
      case 'monitoring':
        return (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="group rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 text-center hover:from-purple-50 hover:to-purple-100 transition-all duration-300 hover:scale-105">
                <div className="text-xs text-slate-500 mb-2">Uptime</div>
                <div className="text-2xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors duration-300">99.9%</div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 rounded-full transition-all duration-1000" style={{width: '99.9%'}}></div>
                </div>
              </div>
              <div className="group rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 text-center hover:from-red-50 hover:to-red-100 transition-all duration-300 hover:scale-105">
                <div className="text-xs text-slate-500 mb-2">Gecikme</div>
                <div className="text-2xl font-bold text-slate-900 group-hover:text-red-700 transition-colors duration-300">12ms</div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 h-1.5 rounded-full transition-all duration-1000" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Son Kontrol</span>
                <span className="text-sm font-semibold text-slate-900">2 dk önce</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Aktif Uyarılar</span>
                <span className="text-sm font-semibold text-green-600">0</span>
              </div>
            </div>
          </div>
        );
      default: // servers
        return (
          <div className="p-6 grid grid-cols-3 gap-4">
            <div className="group rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 text-center hover:from-sky-50 hover:to-sky-100 transition-all duration-300 hover:scale-105">
              <div className="text-xs text-slate-500 mb-2">CPU</div>
              <div className="text-2xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors duration-300">23%</div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                <div className="bg-gradient-to-r from-sky-500 to-sky-600 h-1.5 rounded-full transition-all duration-1000" style={{width: '23%'}}></div>
              </div>
            </div>
            <div className="group rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 text-center hover:from-emerald-50 hover:to-emerald-100 transition-all duration-300 hover:scale-105">
              <div className="text-xs text-slate-500 mb-2">RAM</div>
              <div className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300">3.2 GB</div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-1.5 rounded-full transition-all duration-1000" style={{width: '64%'}}></div>
              </div>
            </div>
            <div className="group rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 text-center hover:from-orange-50 hover:to-orange-100 transition-all duration-300 hover:scale-105">
              <div className="text-xs text-slate-500 mb-2">Disk</div>
              <div className="text-2xl font-bold text-slate-900 group-hover:text-orange-700 transition-colors duration-300">40%</div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 rounded-full transition-all duration-1000" style={{width: '40%'}}></div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-sm p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group">
      <div className="flex gap-2 text-sm mb-4">
        <button 
          onClick={() => setActiveTab('servers')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'servers' 
              ? 'bg-sky-100 text-sky-700 group-hover:bg-sky-200' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
          }`}
        >
          Sunucular
        </button>
        <button 
          onClick={() => setActiveTab('network')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'network' 
              ? 'bg-blue-100 text-blue-700 group-hover:bg-blue-200' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
          }`}
        >
          Ağ
        </button>
        <button 
          onClick={() => setActiveTab('monitoring')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'monitoring' 
              ? 'bg-purple-100 text-purple-700 group-hover:bg-purple-200' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
          }`}
        >
          İzleme
        </button>
      </div>
      <div className="rounded-xl border border-slate-200/60 bg-white/60 backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200/60 text-sm text-slate-600 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>nordic-prod-1 • Frankfurt</span>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}





