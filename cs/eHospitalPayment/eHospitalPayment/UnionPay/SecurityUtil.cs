﻿using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace eHospital.Payment.UnionPay
{
    public static class SecurityUtil
    {
        public static readonly string ALGORITHM_SHA1 = "SHA1";

        /// <summary>
        /// 摘要计算
        /// </summary>
        /// <param name="dataStr"></param>
        /// <param name="encoding"></param>
        /// <returns></returns>
        public static byte[] Sha1X16(string dataStr, Encoding encoding)
        {
            try
            {
                byte[] data = encoding.GetBytes(dataStr);
                SHA1 sha1 = new SHA1CryptoServiceProvider();
                byte[] sha1Res = sha1.ComputeHash(data, 0, data.Length);
                return sha1Res;
            }
            catch (Exception e)
            {
                WebApiConfig.log.Error("sha1失败：" + e.Message);
                return null;
            }
        }


        /// <summary>
        /// 软签名
        /// </summary>
        /// <param name="provider"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static byte[] SignBySoft(RSACryptoServiceProvider provider, byte[] data)
        {
            byte[] res = null;
            try
            {
                HashAlgorithm hashalg = new SHA1CryptoServiceProvider();
                res = provider.SignData(data, hashalg);
                return res;
            }
            catch (Exception e)
            {
                WebApiConfig.log.Error("签名失败：" + e.Message);
                return null;
            }
        }

        /// <summary>
        /// 验证签名
        /// </summary>
        /// <param name="provider"></param>
        /// <param name="base64DecodingSignStr"></param>
        /// <param name="srcByte"></param>
        /// <returns></returns>
        public static bool ValidateBySoft(RSACryptoServiceProvider provider, byte[] base64DecodingSignStr, byte[] srcByte)
        {
            HashAlgorithm hashalg = new SHA1CryptoServiceProvider();
            return provider.VerifyData(srcByte, hashalg, base64DecodingSignStr);
        }

        /// <summary>
        /// Inflater解压缩
        /// </summary>
        /// <param name="inputByte"></param>
        /// <returns></returns>
        public static byte[] inflater(byte[] inputByte)
        {
            byte[] temp = new byte[1024];
            MemoryStream memory = new MemoryStream();
            ICSharpCode.SharpZipLib.Zip.Compression.Inflater inf = new ICSharpCode.SharpZipLib.Zip.Compression.Inflater();
            inf.SetInput(inputByte);
            while (!inf.IsFinished)
            {
                int extracted = inf.Inflate(temp);
                if (extracted > 0)
                {
                    memory.Write(temp, 0, extracted);
                }
                else
                {
                    break;
                }
            }
            return memory.ToArray();
        }

        /// <summary>
        /// deflater压缩
        /// </summary>
        /// <param name="inputByte"></param>
        /// <returns></returns>
        public static byte[] deflater(byte[] inputByte)
        {
            byte[] temp = new byte[1024];
            MemoryStream memory = new MemoryStream();
            ICSharpCode.SharpZipLib.Zip.Compression.Deflater def = new ICSharpCode.SharpZipLib.Zip.Compression.Deflater();
            def.SetInput(inputByte);
            def.Finish();
            while (!def.IsFinished)
            {
                int extracted = def.Deflate(temp);
                if (extracted > 0)
                {
                    memory.Write(temp, 0, extracted);
                }
                else
                {
                    break;
                }
            }
            return memory.ToArray();

        }


        /// <summary>
        /// 密码计算
        /// </summary>
        /// <param name="aPin"></param>
        /// <returns></returns>
        private static byte[] pin2PinBlock(string aPin)
        {
            int tTemp = 1;
            int tPinLen = aPin.Length;

            byte[] tByte = new byte[8];
            try
            {
                tByte[0] = (byte)Convert.ToInt32(tPinLen.ToString(), 10);
                if (tPinLen % 2 == 0)
                {
                    for (int i = 0; i < tPinLen;)
                    {
                        string a = aPin.Substring(i, 2).Trim();
                        tByte[tTemp] = (byte)Convert.ToInt32(a, 16);
                        if (i == (tPinLen - 2))
                        {
                            if (tTemp < 7)
                            {
                                for (int x = (tTemp + 1); x < 8; x++)
                                {
                                    tByte[x] = (byte)0xff;
                                }
                            }
                        }
                        tTemp++;
                        i = i + 2;
                    }
                }
                else
                {
                    for (int i = 0; i < tPinLen - 1;)
                    {
                        string a;
                        a = aPin.Substring(i, 2);
                        tByte[tTemp] = (byte)Convert.ToInt32(a, 16);
                        if (i == (tPinLen - 3))
                        {
                            string b = aPin.Substring(tPinLen - 1) + "F";
                            tByte[tTemp + 1] = (byte)Convert.ToInt32(b, 16);
                            if ((tTemp + 1) < 7)
                            {
                                for (int x = (tTemp + 2); x < 8; x++)
                                {
                                    tByte[x] = (byte)0xff;
                                }
                            }
                        }
                        tTemp++;
                        i = i + 2;
                    }
                }
            }
            catch (Exception e)
            {
                WebApiConfig.log.Error("pin2PinBlock error" + e.Message);
            }

            return tByte;
        }


        /// <summary>
        /// 获取卡号密码pinblock计算
        /// </summary>
        /// <param name="aPin"></param>
        /// <param name="aCardNO"></param>
        /// <returns></returns>
        public static byte[] pin2PinBlockWithCardNO(string aPin, string aCardNO)
        {
            byte[] tPinByte = pin2PinBlock(aPin);
            if (aCardNO.Length == 11)
            {
                aCardNO = "00" + aCardNO;
            }
            else if (aCardNO.Length == 12)
            {
                aCardNO = "0" + aCardNO;
            }
            byte[] tPanByte = formatPan(aCardNO);


            byte[] tByte = new byte[8];
            for (int i = 0; i < 8; i++)
            {
                tByte[i] = (byte)(tPinByte[i] ^ tPanByte[i]);
            }
            return tByte;

        }

        /// <summary>
        /// 卡号计算
        /// </summary>
        /// <param name="aPan"></param>
        /// <returns></returns>
        private static byte[] formatPan(string aPan)
        {
            int tPanLen = aPan.Length;
            byte[] tByte = new byte[8];
            int temp = tPanLen - 13;
            try
            {
                tByte[0] = (byte)0x00;
                tByte[1] = (byte)0x00;
                for (int i = 2; i < 8; i++)
                {
                    string a = aPan.Substring(temp, 2).Trim();
                    tByte[i] = (byte)Convert.ToInt32(a, 16);
                    temp = temp + 2;
                }
            }
            catch (Exception e)
            {
                WebApiConfig.log.Error("formatPan error:" + e.Message);
            }
            return tByte;
        }

        ///<summary>
        /// 加密
        /// </summary>
        /// <returns></returns>
        public static byte[] encryptedData(byte[] encData)
        {
            try
            {
                byte[] enBytes = CertUtil.GetEncryptKey().Encrypt(encData, false);
                return enBytes;
            }
            catch (Exception e)
            {
                WebApiConfig.log.Error("encryptedData error: " + e.Message);
                return new byte[0];
            }
        }

        ///<summary>
        /// 密码加密,进行base64加密@return 转PIN结果
        /// </summary>
        /// <returns></returns>
        public static string EncryptPin(string pin, string card, Encoding encoding)
        {
            /** 生成PIN Block **/
            byte[] pinBlock = pin2PinBlockWithCardNO(pin, card);

            /** 使用公钥对密码加密 **/
            byte[] data = encryptedData(pinBlock);
            return Convert.ToBase64String(data);
        }

        /// <summary>
        /// 加密
        /// </summary>
        /// <param name="dataString">原字符串</param>
        /// <param name="encoding">编码</param>
        /// <returns>RSA+BASE64的加密结果</returns>
        public static string EncryptData(string dataString, Encoding encoding)
        {
            /** 使用公钥对数据加密 **/
            byte[] data = encryptedData(encoding.GetBytes(dataString));
            return Convert.ToBase64String(data);
        }

        /// <summary>
        /// 解密
        /// </summary>
        /// <param name="dataString">原数据</param>
        /// <returns>解密结果</returns>
        public static byte[] decryptData(byte[] data, RSACryptoServiceProvider provider)
        {
            try
            {
                return provider.Decrypt(data, false);
            }
            catch (Exception e)
            {
                WebApiConfig.log.Error("decryptData error: " + e.Message);
                return new byte[0];
            }
        }

        /// <summary>
        /// 解密
        /// </summary>
        /// <param name="dataString">原字符串</param>
        /// <param name="encoding">编码</param>
        /// <returns>解密结果</returns>
        public static string DecryptData(string dataString, Encoding encoding)
        {
            byte[] data = Convert.FromBase64String(dataString);
            data = decryptData(data, CertUtil.GetSignProviderFromPfx());
            return encoding.GetString(data);
        }

        /// <summary>
        /// 解密，多证书
        /// </summary>
        /// <param name="dataString">原字符串</param>
        /// <param name="encoding">编码</param>
        /// <returns>解密结果</returns>
        public static string DecryptData(string dataString, Encoding encoding, string certPath, string certPwd)
        {
            byte[] data = Convert.FromBase64String(dataString);
            data = decryptData(data, CertUtil.GetSignProviderFromPfx(certPath, certPwd));
            return encoding.GetString(data);
        }
    }
}