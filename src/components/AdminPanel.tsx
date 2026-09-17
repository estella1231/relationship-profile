import React, { useState, useEffect } from 'react';
import {
  RedemptionCode,
  CodeStatus,
} from '../types';
import { redemptionService } from '../services/redemptionService';
import {
  KeyRound,
  Download,
  Copy,
  Check,
  Search,
  Plus,
  Shield,
  ArrowLeft,
  Filter,
  Eye,
  RefreshCw,
  Lock,
} from 'lucide-react';

interface AdminPanelProps {
  onBackToApp: () => void;
  onInspectResult?: (code: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToApp, onInspectResult }) => {
  const [codes, setCodes] = useState<RedemptionCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CodeStatus>('all');
  const [generateCount, setGenerateCount] = useState<number>(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [authenticated, setAuthenticated] = useState(true); // default open in development

  useEffect(() => {
    loadCodes();
  }, []);

  const loadCodes = async () => {
    setLoading(true);
    const list = await redemptionService.getAllCodes();
    setCodes(list);
    setLoading(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await redemptionService.generateCodes(generateCount);
    await loadCodes();
    setIsGenerating(false);
  };

  const handleCopy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyNextUnused = async () => {
    const next = codes.find((c) => c.status === 'unused');
    if (next) {
      handleCopy(next.code, 'next_unused');
    }
  };

  const handleToggleDisable = async (id: string) => {
    await redemptionService.toggleDisableCode(id);
    await loadCodes();
  };

  const handleExportCSV = () => {
    const unusedCodes = codes.filter((c) => c.status === 'unused');
    if (unusedCodes.length === 0) {
      alert('暂无未使用的兑换码可导出');
      return;
    }

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Code,Status,CreatedAt'].concat(
        unusedCodes.map((c) => `${c.code},${c.status},${new Date(c.createdAt).toISOString()}`)
      ).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RLP_Unused_Codes_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics
  const totalCount = codes.length;
  const unusedCount = codes.filter((c) => c.status === 'unused').length;
  const activeCount = codes.filter((c) => c.status === 'active').length;
  const completedCount = codes.filter((c) => c.status === 'completed').length;

  const filteredCodes = codes.filter((c) => {
    const matchSearch = c.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="w-full min-h-screen bg-[#FFF7F8] py-8 px-4 sm:px-6 md:px-8 text-[#292529]">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FFFFFF] p-5 rounded-[22px] border border-[#F2E4E8] shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToApp}
              className="p-2 rounded-full hover:bg-[#FFF1F4] text-[#777077] hover:text-[#292529] transition-all"
              aria-label="返回测试应用"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-[#EFA8B8] uppercase">
                  ADMIN CONSOLE
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Mock/Local Database
                </span>
              </div>
              <h1 className="text-xl font-bold text-[#292529] font-serif-zh mt-0.5">
                兑换码管理系统
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyNextUnused}
              className="px-3.5 py-2 rounded-full bg-[#FFFFFF] border border-[#F2E4E8] hover:bg-[#FFF7F8] text-xs font-medium text-[#292529] transition-all flex items-center gap-1.5 shadow-2xs"
            >
              {copiedId === 'next_unused' ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#EFA8B8]" />
              )}
              <span>复制下一个可用码</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-full bg-[#FFFFFF] border border-[#F2E4E8] hover:bg-[#FFF7F8] text-xs font-medium text-[#292529] transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-[#777077]" />
              <span>导出可用码CSV</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#FFFFFF] p-4 rounded-[20px] border border-[#F2E4E8] shadow-xs">
            <div className="text-xs text-[#777077] font-medium">总兑换码</div>
            <div className="text-2xl font-bold text-[#292529] font-mono mt-1">{totalCount}</div>
          </div>
          <div className="bg-[#FFFFFF] p-4 rounded-[20px] border border-[#F2E4E8] shadow-xs">
            <div className="text-xs text-emerald-700 font-medium">未激活 (Unused)</div>
            <div className="text-2xl font-bold text-emerald-600 font-mono mt-1">{unusedCount}</div>
          </div>
          <div className="bg-[#FFFFFF] p-4 rounded-[20px] border border-[#F2E4E8] shadow-xs">
            <div className="text-xs text-amber-700 font-medium">测试中 (Active)</div>
            <div className="text-2xl font-bold text-amber-600 font-mono mt-1">{activeCount}</div>
          </div>
          <div className="bg-[#FFFFFF] p-4 rounded-[20px] border border-[#F2E4E8] shadow-xs">
            <div className="text-xs text-[#EFA8B8] font-medium">已完成报告 (Completed)</div>
            <div className="text-2xl font-bold text-[#EFA8B8] font-mono mt-1">{completedCount}</div>
          </div>
        </div>

        {/* Generate Batch Card */}
        <div className="bg-[#FFFFFF] p-5 rounded-[22px] border border-[#F2E4E8] shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-sm font-semibold text-[#292529]">批量生成兑换码</h3>
            <p className="text-xs text-[#777077] mt-0.5">
              自动使用加密随机数，剔除易混淆字符（0、O、1、I、L），格式为 RLP-XXXXXX。
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={generateCount}
              onChange={(e) => setGenerateCount(Number(e.target.value))}
              className="px-3 py-2 rounded-[14px] bg-[#FFF7F8] border border-[#F2E4E8] text-xs font-medium text-[#292529] focus:outline-none"
            >
              <option value={10}>生成 10 个</option>
              <option value={50}>生成 50 个</option>
              <option value={100}>生成 100 个</option>
              <option value={500}>生成 500 个</option>
            </select>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-4 py-2 rounded-full bg-[#EFA8B8] hover:bg-[#e595a6] text-[#FFFFFF] text-xs font-medium transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isGenerating ? '生成中...' : '立即生成'}</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#FFFFFF] p-4 rounded-[20px] border border-[#F2E4E8] shadow-xs flex flex-col sm:flex-row gap-3 justify-between items-center">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#777077] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="搜索兑换码 (如 RLP-)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-[14px] bg-[#FFF7F8] border border-[#F2E4E8] text-xs text-[#292529] focus:bg-[#FFFFFF] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <Filter className="w-3.5 h-3.5 text-[#777077]" />
            {(['all', 'unused', 'active', 'completed', 'disabled'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-all ${
                  statusFilter === st
                    ? 'bg-[#FFF1F4] border-[#EFA8B8] text-[#292529]'
                    : 'bg-[#FFFFFF] border-[#F2E4E8] text-[#777077] hover:bg-[#FFF7F8]'
                }`}
              >
                {st === 'all'
                  ? '全部'
                  : st === 'unused'
                  ? '未激活'
                  : st === 'active'
                  ? '答题中'
                  : st === 'completed'
                  ? '已完成'
                  : '已停用'}
              </button>
            ))}
            <button
              onClick={loadCodes}
              className="p-1.5 rounded-full border border-[#F2E4E8] text-[#777077] hover:text-[#292529] hover:bg-[#FFF7F8]"
              title="刷新列表"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-[#FFFFFF] rounded-[22px] border border-[#F2E4E8] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F2E4E8] bg-[#FFF7F8] text-[11px] font-mono text-[#777077] uppercase">
                  <th className="py-3 px-4">兑换码</th>
                  <th className="py-3 px-4">状态</th>
                  <th className="py-3 px-4">生成时间</th>
                  <th className="py-3 px-4">激活时间</th>
                  <th className="py-3 px-4">完成时间</th>
                  <th className="py-3 px-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2E4E8] text-xs">
                {filteredCodes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#777077]">
                      未匹配到任何兑换码
                    </td>
                  </tr>
                ) : (
                  filteredCodes.slice(0, 100).map((c) => (
                    <tr key={c.id} className="hover:bg-[#FFF7F8]/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-[#292529]">
                        <div className="flex items-center gap-2">
                          <span>{c.code}</span>
                          <button
                            onClick={() => handleCopy(c.code, c.id)}
                            className="p-1 rounded-md text-[#777077] hover:text-[#292529] hover:bg-[#FFF1F4]"
                            title="复制兑换码"
                          >
                            {copiedId === c.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-medium border ${
                            c.status === 'unused'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : c.status === 'active'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : c.status === 'completed'
                              ? 'bg-[#FFF1F4] text-[#EFA8B8] border-[#F2E4E8]'
                              : 'bg-zinc-100 text-zinc-500 border-zinc-200'
                          }`}
                        >
                          {c.status === 'unused'
                            ? '未激活'
                            : c.status === 'active'
                            ? '答题中'
                            : c.status === 'completed'
                            ? '已生成报告'
                            : '已停用'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#777077] font-mono text-[11px]">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-[#777077] font-mono text-[11px]">
                        {c.activatedAt ? new Date(c.activatedAt).toLocaleTimeString() : '—'}
                      </td>
                      <td className="py-3 px-4 text-[#777077] font-mono text-[11px]">
                        {c.completedAt ? new Date(c.completedAt).toLocaleTimeString() : '—'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {c.status === 'completed' && onInspectResult && (
                            <button
                              onClick={() => onInspectResult(c.code)}
                              className="px-2 py-1 rounded-md bg-[#FFF1F4] text-[#292529] text-[11px] font-medium border border-[#F2E4E8] hover:bg-[#FFFFFF]"
                            >
                              查看画像
                            </button>
                          )}
                          <button
                            onClick={() => handleToggleDisable(c.id)}
                            className="px-2 py-1 rounded-md border border-[#F2E4E8] text-[11px] text-[#777077] hover:text-[#292529] hover:bg-[#FFF7F8]"
                          >
                            {c.status === 'disabled' ? '恢复' : '停用'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-[#FFF7F8] border-t border-[#F2E4E8] text-right text-[11px] text-[#777077]">
            显示前 {Math.min(filteredCodes.length, 100)} / 共 {filteredCodes.length} 条记录
          </div>
        </div>
      </div>
    </div>
  );
};
