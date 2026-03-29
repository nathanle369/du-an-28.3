/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ChevronDown, 
  Star, 
  Clock, 
  Download, 
  X, 
  ShieldCheck, 
  Mail, 
  Phone, 
  User,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import emailjs from '@emailjs/browser';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// CONFIG
const CONFIG = {
  bankName: 'Vietcombank',
  bankCode: 'VCB',
  accountNumber: '1234567890',
  accountName: 'NGUYEN VAN A',
  amount: 79000,
  emailjs: {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY',
  },
  promoHours: 2,
};

// --- Components ---

const Countdown = ({ hours }: { hours: number }) => {
  const [timeLeft, setTimeLeft] = useState(hours * 3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
  const m = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="flex gap-1 items-center">
      <span className="bg-gold/20 border border-gold/35 text-gold text-sm font-bold px-2 py-0.5 rounded animate-tick tabular-nums">{h}</span>
      <span className="text-gold font-bold">:</span>
      <span className="bg-gold/20 border border-gold/35 text-gold text-sm font-bold px-2 py-0.5 rounded animate-tick tabular-nums">{m}</span>
      <span className="text-gold font-bold">:</span>
      <span className="bg-gold/20 border border-gold/35 text-gold text-sm font-bold px-2 py-0.5 rounded animate-tick tabular-nums">{s}</span>
    </div>
  );
};

const HeroCountdown = ({ hours }: { hours: number }) => {
  const [timeLeft, setTimeLeft] = useState(hours * 3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
  const m = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="flex gap-2 items-center mb-4">
      <span className="text-[12px] text-white/45 uppercase tracking-widest">Ưu đãi hết sau</span>
      <div className="flex gap-1.5">
        <div className="text-center">
          <span className="block bg-gold/15 border border-gold/25 text-gold text-2xl font-bold px-3 py-2 rounded-lg min-w-[48px] tabular-nums animate-tick">{h}</span>
          <span className="block text-[9px] text-white/30 uppercase tracking-wider mt-1">Giờ</span>
        </div>
        <span className="text-gold/50 text-xl font-bold leading-none mt-1">:</span>
        <div className="text-center">
          <span className="block bg-gold/15 border border-gold/25 text-gold text-2xl font-bold px-3 py-2 rounded-lg min-w-[48px] tabular-nums animate-tick">{m}</span>
          <span className="block text-[9px] text-white/30 uppercase tracking-wider mt-1">Phút</span>
        </div>
        <span className="text-gold/50 text-xl font-bold leading-none mt-1">:</span>
        <div className="text-center">
          <span className="block bg-gold/15 border border-gold/25 text-gold text-2xl font-bold px-3 py-2 rounded-lg min-w-[48px] tabular-nums animate-tick">{s}</span>
          <span className="block text-[9px] text-white/30 uppercase tracking-wider mt-1">Giây</span>
        </div>
      </div>
    </div>
  );
};

const AccordionItem = ({ 
  num, 
  title, 
  subtitle, 
  desc, 
  outcome, 
  isOpen, 
  onClick 
}: { 
  num: number, 
  title: string, 
  subtitle: string, 
  desc: string, 
  outcome: string, 
  isOpen: boolean, 
  onClick: () => void,
  key?: React.Key
}) => {
  return (
    <div className={cn(
      "bg-white border-1.5 border-[#e2e8f0] rounded-2xl overflow-hidden transition-all duration-300",
      isOpen && "border-gold/40 shadow-[0_4px_24px_rgba(232,166,35,0.1)]"
    )}>
      <div className="flex items-center gap-4 p-5.5 cursor-pointer select-none" onClick={onClick}>
        <div className={cn(
          "w-10 h-10 rounded-xl bg-navy text-gold font-playfair text-lg font-black flex items-center justify-center shrink-0 transition-all duration-300",
          isOpen && "bg-gold text-navy"
        )}>
          {num}
        </div>
        <div className="flex-1">
          <div className="text-base font-semibold text-navy mb-0.5">{title}</div>
          <div className="text-[13px] text-muted">{subtitle}</div>
        </div>
        <ChevronDown className={cn("w-5 h-5 text-muted transition-all duration-300 shrink-0", isOpen && "rotate-180 text-gold")} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pl-20">
              <p className="text-[15px] text-[#2d3748] leading-relaxed mb-4">{desc}</p>
              <div className="bg-gold-pale border-l-3 border-gold rounded-r-lg p-3 text-[14px] text-[#92400e]">
                <strong className="text-[#78350f]">Sau chương này bạn sẽ:</strong> {outcome}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string, key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden">
      <div 
        className="flex items-center justify-between gap-4 p-5 cursor-pointer text-[15px] font-semibold text-navy"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <ChevronDown className={cn("w-[18px] h-[18px] text-muted transition-all duration-250 shrink-0", isOpen && "rotate-180 text-gold")} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-[15px] text-[#2d3748] leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({ name: false, email: false, phone: false });
  const [orderId, setOrderId] = useState('');
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateOrderId = () => {
    const rand = Math.floor(Math.random() * 9000) + 1000;
    return `ORDER-${Date.now()}-${rand}`;
  };

  const validateField = (field: keyof typeof formData, value: string) => {
    if (field === 'name') return value.trim().length >= 3;
    if (field === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    if (field === 'phone') return /^(0|\+84)[0-9]{9}$/.test(value.replace(/\s/g, ''));
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const field = id.replace('inp-', '') as keyof typeof formData;
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: !validateField(field, value) && value.length > 0 });
  };

  const goToPayment = () => {
    const nameOk = validateField('name', formData.name);
    const emailOk = validateField('email', formData.email);
    const phoneOk = validateField('phone', formData.phone);

    setErrors({
      name: !nameOk,
      email: !emailOk,
      phone: !phoneOk
    });

    if (nameOk && emailOk && phoneOk) {
      setOrderId(generateOrderId());
      setStep(2);
    }
  };

  const confirmPayment = async () => {
    setIsSubmitting(true);
    // Simulate API call or EmailJS
    try {
      // In a real app, you'd initialize emailjs with your public key
      // emailjs.init(CONFIG.emailjs.publicKey);
      // await emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, { ... });
      
      setStep(3);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-[999] bg-navy py-2.5 border-b border-white/8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="font-playfair text-lg font-black text-white">Làm Chủ <span className="text-gold">Claude AI</span></div>
            <div className="hidden sm:flex items-center gap-2 text-[13px] text-white/70">
              🔥 Ưu đãi kết thúc sau:&nbsp;
              <Countdown hours={CONFIG.promoHours} />
            </div>
            <button className="btn btn-gold px-5.5 py-2.5 text-sm" onClick={() => setIsModalOpen(true)}>
              Mua ngay — 79,000đ
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-navy pt-24 pb-20 relative overflow-hidden">
        <div className="absolute -top-[120px] -right-[120px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(232,166,35,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[80px] -left-[80px] w-[440px] h-[440px] rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.1)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-1">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-gold/12 border border-gold/30 text-gold-light text-[11px] font-semibold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-7">
                📘 Ebook thực chiến · Tiếng Việt
              </div>
              <h1 className="text-white mb-3 text-[clamp(2.2rem,5vw,3.8rem)] font-black">
                Từ Người Dùng Thường Đến <em className="text-gold not-italic block">Chuyên Nghiệp</em> Trong 90 Ngày
              </h1>
              <p className="text-lg text-white/65 font-light max-w-[480px] mb-9 leading-relaxed">
                Hầu hết người dùng Claude nhận về câu trả lời chung chung rồi bỏ cuộc. Ebook này chỉ bạn cách xây hệ thống để Claude tự động làm việc — ngay cả khi bạn không ở đó.
              </p>

              <HeroCountdown hours={CONFIG.promoHours} />

              <div className="flex items-center gap-5 flex-wrap mb-10">
                <button className="btn btn-gold px-12 py-5 text-lg" onClick={() => setIsModalOpen(true)}>
                  📥 Mua Ngay — 79,000đ
                </button>
                <a href="#chapters" className="btn btn-ghost px-9 py-4">Xem nội dung ↓</a>
              </div>
              <div className="text-sm text-white/50">
                Giá gốc <s className="text-white/30">199,000đ</s> · Tiết kiệm 120,000đ · Thanh toán một lần, dùng mãi mãi
              </div>

              <div className="flex items-center gap-6 flex-wrap pt-8 border-t border-white/10 mt-10">
                <div className="flex items-center gap-2 text-sm text-white/65">
                  <span className="font-playfair text-[22px] font-black text-gold">1,240+</span> người đã mua
                </div>
                <div className="flex items-center gap-2 text-sm text-white/65">
                  <div className="text-gold text-base tracking-[2px]">★★★★★</div> 4.9/5 sao
                </div>
                <div className="flex items-center gap-2 text-sm text-white/65">
                  <Mail className="w-4 h-4 text-gold" /> Giao ebook qua email
                </div>
              </div>
            </motion.div>

            {/* Ebook Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-[400px] mx-auto lg:max-w-none"
            >
              <div className="bg-linear-to-br from-navy-mid to-navy rounded-[20px] p-10 border border-gold/20 shadow-[0_24px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="inline-block bg-gold/15 border border-gold/30 text-gold text-[10px] font-bold tracking-[2px] uppercase px-3 py-1 rounded-full mb-6">
                  📘 Ebook · 5 Chương
                </div>
                <div className="font-playfair text-[28px] font-black text-white leading-[1.2] mb-1.5">
                  Làm Chủ <span className="text-gold block">Claude AI</span>
                </div>
                <div className="text-[13px] text-white/45 mb-7">Hướng dẫn thực chiến từ prompt đến tự động hóa</div>
                <div className="flex flex-col gap-2 mb-8">
                  {[
                    "Prompt Hiệu Quả — Framework GCAO",
                    "Cá Nhân Hóa — Hệ Điều Hành AI",
                    "Projects & Skills — Làm Có Hệ Thống",
                    "Tự Động Hóa — Connectors & Cowork",
                    "Tư Duy Hệ Thống — Cấp Độ Chuyên Gia"
                  ].map((ch, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[13px] text-white/70">
                      <div className="w-6 h-6 rounded-full bg-gold/15 border border-gold/30 text-gold text-[11px] font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                      {ch}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-white/8">
                  <div>
                    <div className="text-[13px] text-white/35 line-through">199,000đ</div>
                    <div className="font-playfair text-[32px] font-black text-gold">79K</div>
                  </div>
                  <div className="text-[11px] text-white/35 text-right">
                    <div className="text-[22px] mb-1">📄</div>
                    <div>20+ Ví dụ thực tế</div>
                    <div>5 Framework</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-[620px] mx-auto mb-14">
            <div className="tag">Bạn có đang gặp điều này?</div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold mb-4">
              Tại sao 90% người dùng Claude <span className="text-gold">không nhận được kết quả</span> xứng đáng?
            </h2>
            <p className="text-muted">Không phải lỗi của bạn. Không phải lỗi của Claude. Chỉ là bạn chưa có đúng hệ thống.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {[
              { icon: "😤", title: "Câu trả lời chung chung, vô dụng", desc: "Bạn hỏi, Claude trả lời những thứ bạn đã biết rồi. Cảm giác như đang dùng Google nhưng tệ hơn." },
              { icon: "🔄", title: "Giải thích lại từ đầu mỗi ngày", desc: "Mỗi cuộc trò chuyện mới lại phải kể lại bạn là ai, bạn làm gì, bạn cần gì. Mệt mỏi và tốn thời gian." },
              { icon: "🎲", title: "Kết quả lúc tốt lúc xấu", desc: "Hôm nay Claude cho kết quả tuyệt vời, ngày mai thì tệ hoàn toàn. Không đoán được, không tin tưởng được." },
              { icon: "⏰", title: "Tốn thêm thời gian hơn là tiết kiệm", desc: "Bạn phải đọc, sửa, format lại mọi thứ Claude tạo ra. Đôi khi tự làm còn nhanh hơn." },
              { icon: "📚", title: "Học tính năng mới mà không dùng được", desc: "Xem video, đọc bài viết về tính năng mới. Nhưng về đến công việc thật lại không biết áp dụng vào đâu." }
            ].map((p, i) => (
              <div key={i} className="bg-white border border-[#e2e8f0] rounded-2xl p-7 relative overflow-hidden transition-all duration-300 hover:border-red-600/25 hover:-translate-y-0.5 hover:shadow-custom group">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r from-red-500 to-orange-500" />
                <div className="text-[28px] mb-3.5">{p.icon}</div>
                <div className="text-base font-semibold text-navy mb-1.5">{p.title}</div>
                <p className="text-sm text-muted leading-relaxed m-0">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-navy rounded-[20px] p-12 text-center relative overflow-hidden">
            <div className="absolute top-[-30px] left-5 font-playfair text-[200px] text-gold/5 leading-none pointer-events-none">"</div>
            <p className="font-playfair text-[22px] text-white leading-relaxed relative z-1 max-w-[600px] mx-auto mb-5">
              Bạn không sai. Claude không tệ. Vấn đề là bạn đang dùng một công cụ mạnh mẽ <em>như một thanh tìm kiếm</em> — trong khi nó có thể là <em>hệ điều hành cho toàn bộ công việc của bạn.</em>
            </p>
            <p className="text-[15px] text-white/55 relative z-1">Ebook này là cầu nối giữa hai trạng thái đó.</p>
          </div>
        </div>
      </section>

      {/* Chapters Section */}
      <section id="chapters" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-[600px] mx-auto mb-14">
            <div className="tag">Nội dung ebook</div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold mb-4">
              5 Chương — Một hệ thống <span className="text-gold">hoàn chỉnh từ A đến Z</span>
            </h2>
            <p className="text-muted">Mỗi chương xây trên nền tảng của chương trước. Không nhảy cóc. Không lý thuyết thừa.</p>
          </div>

          <div className="flex flex-col gap-3 max-w-[800px] mx-auto">
            {[
              { 
                num: 1, 
                title: "Nói Chuyện Để Ra Kết Quả", 
                subtitle: "Framework GCAO · Nghệ thuật iteration", 
                desc: "Tại sao cùng một câu hỏi, người nhận về kết quả vô dụng, người nhận kết quả thay đổi cả ngày làm việc. Framework GCAO (Mục tiêu + Bối cảnh + Hành động + Đầu ra) và kỹ thuật iteration — hai công cụ tạo ra 80% sự khác biệt.",
                outcome: "Biết viết prompt nhận kết quả hữu ích ngay lần đầu. Có 3 ví dụ thực tế để tham khảo cho ngành của bạn."
              },
              { 
                num: 2, 
                title: "Cá Nhân Hóa — Hệ Điều Hành AI Của Bạn", 
                subtitle: "Custom Instructions · 5 phần thiết lập một lần", 
                desc: "Dừng giải thích lại bản thân mỗi ngày. Template 5 phần (Danh tính, Phong cách, Mục tiêu, Lịch trình, Điều tránh né) giúp Claude hiểu bạn sâu sắc từ cuộc trò chuyện đầu tiên — mãi mãi.",
                outcome: "Có Custom Instructions hoàn chỉnh. Claude không cần được giới thiệu lại. Kết quả nhất quán hơn ngay lập tức."
              },
              { 
                num: 3, 
                title: "Projects & Skills — Làm Việc Có Hệ Thống", 
                subtitle: "DBS Framework · Quy trình tự động hóa", 
                desc: "Projects là \"phòng làm việc\" có ngữ cảnh riêng. Skills là quy trình tự động hóa — gõ một từ khóa, Claude chạy toàn bộ quy trình theo đúng tiêu chuẩn của bạn. Framework DBS giúp xây từ đơn giản đến phức tạp.",
                outcome: "Tạo được ít nhất 1 Project và 1 Skill hoạt động. Tiết kiệm ngay 2-3 giờ/tuần từ tuần đầu tiên."
              },
              { 
                num: 4, 
                title: "Tự Động Hóa Thực Sự", 
                subtitle: "Connectors · Claude Cowork · Scheduled Tasks", 
                desc: "Connectors kết nối Gmail, Calendar, Drive. Claude Cowork làm việc trực tiếp với file trên máy tính. Scheduled Tasks chạy tự động theo lịch — ngay cả khi bạn đang ngủ.",
                outcome: "Có ít nhất 1 tác vụ tự chạy mỗi sáng. Tiết kiệm 5-10 giờ/tuần có thể đo lường được."
              },
              { 
                num: 5, 
                title: "Tư Duy Hệ Thống — Cấp Độ Chuyên Gia", 
                subtitle: "5 nguyên tắc · Lộ trình 90 ngày · Thói quen bền vững", 
                desc: "Công cụ thay đổi, nhưng tư duy đúng không lỗi thời. 5 cấp độ thành thạo, lộ trình 90 ngày rõ ràng, và những thói quen giúp hệ thống ngày càng mạnh hơn — không phải yếu đi theo thời gian.",
                outcome: "Có bản đồ rõ ràng cho 90 ngày tiếp theo. Biết hỏi đúng câu hỏi khi Claude ra tính năng mới."
              }
            ].map((ch) => (
              <AccordionItem 
                key={ch.num}
                num={ch.num}
                title={ch.title}
                subtitle={ch.subtitle}
                desc={ch.desc}
                outcome={ch.outcome}
                isOpen={openAccordion === ch.num}
                onClick={() => setOpenAccordion(openAccordion === ch.num ? null : ch.num)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-[520px] mx-auto mb-12">
            <div className="tag">Đầu tư một lần · Dùng mãi mãi</div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold mb-4">
              Chỉ bằng một <span className="text-gold">bữa ăn ngoài</span> — nhận lại hàng trăm giờ
            </h2>
          </div>

          <div className="flex justify-center">
            <div className="bg-navy rounded-[24px] p-10 sm:p-13 max-w-[580px] w-full relative overflow-hidden border border-gold/20">
              <div className="absolute -top-20 -right-20 w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(232,166,35,0.12)_0%,transparent_70%)] pointer-events-none" />
              
              <div className="inline-block bg-gold text-navy text-[11px] font-bold tracking-[1.5px] uppercase px-3.5 py-1 rounded-full mb-7">
                🔥 Ưu đãi giới hạn
              </div>
              <h3 className="font-playfair text-2xl font-bold text-white mb-6">Ebook "Làm Chủ Claude AI" — Trọn bộ</h3>

              <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 mb-7 text-center">
                <div className="text-[12px] text-white/50 uppercase tracking-[1.5px] mb-2">Giá này kết thúc sau</div>
                <div className="flex justify-center gap-2">
                  <Countdown hours={CONFIG.promoHours} />
                </div>
              </div>

              <div className="flex items-baseline gap-3.5 mb-2">
                <span className="text-xl text-white/30 line-through">199,000đ</span>
                <span className="font-playfair text-[56px] font-black text-gold leading-none">79.000</span>
                <span className="text-base text-white/50 self-center">đ</span>
              </div>
              <div className="text-[13px] text-gold mb-7 opacity-80">Bạn tiết kiệm 120,000đ (60% off)</div>

              <ul className="flex flex-col gap-2.5 mb-8">
                {[
                  "Toàn bộ 5 chương + Lời Mở Đầu + Lời Kết",
                  "Template Custom Instructions 5 phần (điền ngay)",
                  "DBS Framework để xây Skills chuyên nghiệp",
                  "20+ ví dụ thực tế có thể copy & áp dụng ngay",
                  "Lộ trình 90 ngày từng bước rõ ràng",
                  "Cập nhật miễn phí vĩnh viễn",
                  "Giao hàng tức thì qua email sau thanh toán"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                    <Check className="w-4 h-4 text-gold shrink-0" /> {item}
                  </li>
                ))}
              </ul>

              <button className="btn btn-gold w-full py-5 text-lg mb-5" onClick={() => setIsModalOpen(true)}>
                📥 Mua Ngay — Chỉ 79,000đ
              </button>

              <div className="flex items-center gap-2.5 bg-white/6 rounded-xl p-3.5 text-[13px] text-white/60">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span><strong className="text-white/85">Giao ebook qua email tự động</strong> — Ngay sau khi thanh toán xác nhận, ebook PDF được gửi đến email của bạn trong vòng 5 phút.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-[480px] mx-auto mb-12">
            <div className="tag">Câu hỏi thường gặp</div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold mb-4">Bạn đang thắc mắc điều gì?</h2>
          </div>

          <div className="flex flex-col gap-3 max-w-[720px] mx-auto">
            {[
              { q: "Tôi nhận ebook bằng cách nào sau khi thanh toán?", a: "Ngay sau khi thanh toán được xác nhận, hệ thống tự động gửi email chứa link download đến địa chỉ email bạn đăng ký. Thường trong vòng 1–5 phút. Kiểm tra hộp thư Spam nếu không thấy email." },
              { q: "Tôi cần gói Claude nào để áp dụng được ebook?", a: "Phần lớn nội dung (Chương 1, 2, 3) hoạt động với gói Free. Chương 4 (Connectors, Cowork, Scheduled Tasks) cần gói Pro (khoảng $20/tháng). Ebook có ghi rõ yêu cầu từng chương." },
              { q: "Tôi không giỏi công nghệ, có học được không?", a: "Hoàn toàn được. Ebook được viết cho người không có nền tảng kỹ thuật. Nếu bạn biết nhắn tin và gõ email, bạn làm được tất cả mọi thứ trong ebook. Nhiều người mua ở độ tuổi 45-55 phản hồi rất tích cực." },
              { q: "Ebook gửi qua email mất bao lâu?", a: "Sau khi chúng tôi xác nhận thanh toán (thường trong vòng 1–15 phút trong giờ hành chính), ebook PDF sẽ được gửi ngay đến email bạn đăng ký. Vui lòng kiểm tra hộp thư Spam nếu không thấy email sau 15 phút." },
              { q: "Ebook có được cập nhật không khi Claude ra tính năng mới?", a: "Có. Tất cả người mua đều nhận cập nhật miễn phí vĩnh viễn. Khi ebook được nâng cấp nội dung, chúng tôi gửi email thông báo và link download phiên bản mới." }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy py-24 text-center relative overflow-hidden">
        <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(232,166,35,0.1)_0%,transparent_65%)] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-1">
          <h2 className="text-white max-w-[580px] mx-auto mb-5 text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold">
            Bạn đã đọc đến đây. <span className="text-gold">Bước cuối cùng</span> là bắt đầu.
          </h2>
          <p className="text-white/60 max-w-[480px] mx-auto mb-10">
            Hơn 1,200 người đã thay đổi cách làm việc. Tuần tới bạn có thể là người tiếp theo — hoặc bạn sẽ tiếp tục dùng Claude theo cách cũ.
          </p>
          <button className="btn btn-gold px-12 py-5 text-lg" onClick={() => setIsModalOpen(true)}>
            📥 Bắt Đầu Ngay — Chỉ 79,000đ
          </button>
          <div className="text-sm text-white/45 mt-4">
            🔥 Còn <Countdown hours={CONFIG.promoHours} /> ở mức giá này · Thanh toán an toàn · Giao hàng tức thì
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-12 text-center border-t border-white/7">
        <div className="container mx-auto px-6">
          <div className="font-playfair text-xl font-black text-white mb-3">Làm Chủ <span className="text-gold">Claude AI</span></div>
          <div className="flex justify-center gap-6 flex-wrap mb-5">
            <a href="#" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">Hỗ trợ</a>
            <a href="#" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">Điều khoản sử dụng</a>
            <a href="#" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">Bảo mật</a>
          </div>
          <div className="text-[12px] text-white/25">
            © 2025 · Thanh toán an toàn qua VietQR · Giao hàng tức thì qua email
          </div>
        </div>
      </footer>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            className="fixed inset-0 bg-[#0a0f1e]/85 z-[10000] flex items-center justify-center p-5"
            onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="bg-cream rounded-[24px] w-full max-w-[520px] max-h-[90vh] overflow-y-auto relative"
            >
              <div className="bg-navy p-7 sm:p-8 rounded-t-[24px] flex items-center justify-between">
                <div className="font-playfair text-xl font-bold text-white">
                  {step === 1 ? 'Đặt mua ebook' : step === 2 ? 'Thanh toán' : 'Nhận ebook'}
                </div>
                <button 
                  className="bg-white/10 border-none text-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8">
                {/* Steps Indicator */}
                <div className="flex mb-8">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex-1 text-center relative">
                      {s < 3 && (
                        <div className={cn(
                          "absolute top-4 left-[60%] w-[80%] h-0.5 bg-[#e2e8f0]",
                          step > s && "bg-gold"
                        )} />
                      )}
                      <div className={cn(
                        "w-8 h-8 rounded-full bg-[#e2e8f0] text-muted text-[13px] font-semibold flex items-center justify-center mx-auto mb-1.5 transition-all duration-300 relative z-1",
                        step === s && "bg-gold text-navy",
                        step > s && "bg-green-600 text-white"
                      )}>
                        {step > s ? <Check className="w-4 h-4" /> : s}
                      </div>
                      <div className={cn(
                        "text-[11px] text-muted uppercase tracking-wider",
                        step === s && "text-gold font-semibold"
                      )}>
                        {s === 1 ? 'Thông tin' : s === 2 ? 'Thanh toán' : 'Nhận ebook'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Step 1: Info */}
                {step === 1 && (
                  <div className="animate-fade-up">
                    <h3 className="mb-1.5 text-lg font-bold">Điền thông tin của bạn</h3>
                    <p className="text-sm text-muted mb-6">Ebook sẽ được gửi đến email này ngay sau khi thanh toán.</p>

                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-navy mb-1.5">Họ và tên <span className="text-red-600">*</span></label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input 
                          type="text" 
                          id="inp-name" 
                          className={cn(
                            "w-full pl-11 pr-4 py-3 border-1.5 border-[#e2e8f0] rounded-xl text-[15px] bg-white text-navy outline-none transition-all",
                            errors.name && "border-red-600 focus:ring-3 focus:ring-red-600/10"
                          )}
                          placeholder="Nguyễn Văn A"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.name && <div className="text-[12px] text-red-600 mt-1">Vui lòng nhập tên đầy đủ (ít nhất 3 ký tự)</div>}
                    </div>

                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-navy mb-1.5">Email <span className="text-red-600">*</span></label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input 
                          type="email" 
                          id="inp-email" 
                          className={cn(
                            "w-full pl-11 pr-4 py-3 border-1.5 border-[#e2e8f0] rounded-xl text-[15px] bg-white text-navy outline-none transition-all",
                            errors.email && "border-red-600 focus:ring-3 focus:ring-red-600/10"
                          )}
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.email && <div className="text-[12px] text-red-600 mt-1">Vui lòng nhập email hợp lệ</div>}
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-navy mb-1.5">Số điện thoại <span className="text-red-600">*</span></label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input 
                          type="tel" 
                          id="inp-phone" 
                          className={cn(
                            "w-full pl-11 pr-4 py-3 border-1.5 border-[#e2e8f0] rounded-xl text-[15px] bg-white text-navy outline-none transition-all",
                            errors.phone && "border-red-600 focus:ring-3 focus:ring-red-600/10"
                          )}
                          placeholder="0912 345 678"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.phone && <div className="text-[12px] text-red-600 mt-1">Vui lòng nhập số điện thoại 10 số hợp lệ</div>}
                    </div>

                    <div className="bg-gold-pale border-l-3 border-gold rounded-r-lg p-3 text-[13px] text-[#92400e] mb-6">
                      🔒 Thông tin của bạn được bảo mật. Chúng tôi không chia sẻ dữ liệu với bên thứ ba.
                    </div>

                    <div className="bg-navy rounded-xl p-4 mb-6 flex justify-between items-center">
                      <div>
                        <div className="text-[13px] text-white/50">Tổng thanh toán</div>
                        <div className="font-playfair text-[28px] font-black text-gold">79,000đ</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[12px] text-white/40 line-through">199,000đ</div>
                        <div className="text-[13px] text-gold">Tiết kiệm 120,000đ</div>
                      </div>
                    </div>

                    <button className="btn btn-gold w-full py-5 text-lg" onClick={goToPayment}>
                      Tiếp tục → Thanh toán
                    </button>
                  </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <div className="text-center animate-fade-up">
                    <p className="text-sm text-muted mb-3">Mã đơn hàng của bạn:</p>
                    <div className="bg-navy text-gold font-mono text-sm font-semibold px-5 py-2.5 rounded-full inline-block mb-5">{orderId}</div>

                    <div className="border-2 border-[#e2e8f0] rounded-2xl p-5 inline-block bg-white mb-5">
                      <QRCodeSVG 
                        value={`https://img.vietqr.io/image/${CONFIG.bankCode}-${CONFIG.accountNumber}-compact2.png?amount=${CONFIG.amount}&addInfo=${encodeURIComponent(orderId)}&accountName=${encodeURIComponent(CONFIG.accountName)}`}
                        size={200}
                        level="H"
                      />
                    </div>

                    <div className="bg-navy rounded-xl p-4 mb-5 text-left">
                      {[
                        { label: 'Ngân hàng', value: CONFIG.bankName },
                        { label: 'Số tài khoản', value: CONFIG.accountNumber },
                        { label: 'Chủ tài khoản', value: CONFIG.accountName },
                        { label: 'Nội dung CK', value: orderId, highlight: true },
                        { label: 'Số tiền', value: '79,000đ', amount: true }
                      ].map((row, i) => (
                        <div key={i} className={cn(
                          "flex justify-between items-center py-1.5 border-b border-white/7",
                          i === 4 && "border-none"
                        )}>
                          <span className="text-[12px] text-white/45 uppercase tracking-wider">{row.label}</span>
                          <span className={cn(
                            "text-sm font-semibold text-white",
                            row.highlight && "text-amber-400",
                            row.amount && "text-gold font-playfair text-lg"
                          )}>
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-red-600/8 border border-red-600/20 rounded-xl p-3 text-center text-sm text-red-800 mb-5">
                      ⏱️ Vui lòng thanh toán trong: <strong className="text-[22px] tabular-nums">15:00</strong>
                    </div>

                    <p className="text-[13px] text-muted leading-relaxed mb-5">
                      Sau khi chuyển khoản, nhấn nút bên dưới để xác nhận. Ebook sẽ được gửi đến email <strong>{formData.email}</strong> trong vòng 5 phút.
                    </p>

                    <button 
                      className="btn btn-gold w-full mb-3" 
                      onClick={confirmPayment}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Đang xử lý...
                        </div>
                      ) : (
                        "✅ Tôi đã chuyển khoản xong"
                      )}
                    </button>

                    <button className="bg-transparent border-1.5 border-[#e2e8f0] rounded-xl px-5 py-3 text-sm text-muted w-full hover:border-navy hover:text-navy transition-all">
                      Nhập mã giao dịch thủ công
                    </button>
                  </div>
                )}

                {/* Step 3: Success */}
                {step === 3 && (
                  <div className="text-center py-5 animate-fade-up">
                    <div className="text-[64px] mb-4">🎉</div>
                    <h2 className="font-playfair text-[28px] font-black text-navy mb-2">Cảm ơn <span className="text-gold">{formData.name.split(' ').pop()}</span>!</h2>
                    <p className="text-[15px] text-muted mb-8 leading-relaxed">Thanh toán đã được ghi nhận. Ebook của bạn đã sẵn sàng để tải về.</p>

                    <div className="bg-green-600/8 border border-green-600/20 rounded-xl p-3 text-[13px] text-green-800 mb-4 flex items-center gap-2">
                      <Mail className="w-4 h-4 shrink-0" />
                      <span>Email xác nhận đã được gửi đến <strong>{formData.email}</strong></span>
                    </div>

                    <div className="bg-navy rounded-2xl p-7 mb-5">
                      <div className="text-[14px] text-white/50 uppercase tracking-[1.5px] mb-3">📧 Ebook đã được gửi vào email của bạn</div>
                      <div className="bg-gold/15 border border-gold/30 rounded-xl p-4.5 text-left mb-3.5">
                        <div className="text-[13px] text-white/55 mb-1.5">Email được gửi đến:</div>
                        <div className="text-base font-semibold text-gold">{formData.email}</div>
                      </div>
                      <div className="text-[14px] text-white/65 leading-relaxed text-left">
                        <div className="mb-2">📌 <strong className="text-white/85">Vui lòng kiểm tra hộp thư của bạn</strong> — ebook PDF đính kèm trong email xác nhận.</div>
                        <div className="mb-2">📁 Nếu không thấy email trong <strong className="text-white/85">5 phút</strong>, hãy kiểm tra thư mục <strong className="text-white/85">Spam / Quảng cáo</strong>.</div>
                        <div>✉️ Vẫn chưa nhận được? Liên hệ hỗ trợ với mã đơn hàng bên dưới.</div>
                      </div>
                      <div className="text-[12px] text-white/35 mt-4">File PDF · Nhận vĩnh viễn · Cập nhật miễn phí qua email</div>
                    </div>

                    <p className="text-[13px] text-muted leading-relaxed">
                      Nếu có vấn đề, email về <strong>Hoanghaicpt2@gmail.com</strong> với mã đơn hàng <strong>{orderId}</strong>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
