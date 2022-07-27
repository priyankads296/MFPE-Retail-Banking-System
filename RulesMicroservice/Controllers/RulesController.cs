using Microsoft.AspNetCore.Mvc;
using RulesMicroservice.Model;
using RulesMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace RulesMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RulesController : ControllerBase
    {
        private IRuleRepository _ruleRepository;
        private IChargeRepository _chargeRepository;
        static readonly log4net.ILog _log4net = log4net.LogManager.GetLogger(typeof(RulesController));
        public RulesController(IRuleRepository ruleRepository, IChargeRepository chargeRepository)
        {
            _ruleRepository = ruleRepository;
            _chargeRepository = chargeRepository;

        }



        [HttpGet]

        [Route("evaluateMinBal/{AccountID}/{Balance}")]
        public async Task<IActionResult> EvaluateMinBalAsync(int AccountID, int Balance)
        {
            RuleStatus ruleStatus = new RuleStatus();
            _log4net.Info("Evaluating Minimum Balance");
            // try
            // {
            double MinBalance = await _ruleRepository.GetMinBalance(AccountID);




            if (Balance >= MinBalance)
            {
                ruleStatus.status = Status.Allowed;
                return Ok(ruleStatus);
            }
            else
            {


                ruleStatus.status = Status.Denied;
                return BadRequest(ruleStatus);
            }
            //}
            /* catch (NullReferenceException e)
             {
                 _log4net.Error("NullReferenceException caught. Issue in calling Account API", e);
                 return NotFound(e);

             }
             catch (Exception e)
             {
                 _log4net.Error("Exception caught. Issue in calling Account API", e);
                 ruleStatus.status = Status.NA;
                 return NotFound(ruleStatus);
             }*/
        }



        [HttpGet]
        [Route("getServiceCharge")]
        public float GetServiceCharge(string AccountType)
        {
            if (AccountType == "Savings")
            {
                return 100;
            }
            else if (AccountType == "Current")
            {
                return 200;
            }
            else
            {
                return 0;
            }
        }



        [HttpGet]
        [Route("monthlyBatchJob")]
        public IActionResult MonthlyBatchJob()
        {
            try
            {
                if (DateTime.Now.Day == 1)
                {
                    _log4net.Info("Monthly Checking Started");
                    try
                    {
                        List<Account> AllAcc = _ruleRepository.GetAccounts();
                        foreach (var x in AllAcc)
                        {
                            if (x.Balance < x.MinBalance)
                            {
                                float ServiceCharge = GetServiceCharge(x.accountType);



                                if (x.accountType == "Savings")
                                {
                                    var status = _chargeRepository.ApplyServiceCharge(x.Sav_AccountId, (int)ServiceCharge);



                                    if (status.transferStatus == "Your account has been credited")
                                    {
                                        _log4net.Info("Service charge deducted for the AccountID = " + x.Sav_AccountId);
                                    }
                                    else
                                    {
                                        _log4net.Info("Some Issue occured while deducting service charge for the AccountID = " + x.Sav_AccountId);
                                    }
                                }
                                else if (x.accountType == "Current")
                                {
                                    var status = _chargeRepository.ApplyServiceCharge(x.Cur_AccountId, (int)ServiceCharge);



                                    if (status.transferStatus == "Your account has been credited")
                                    {
                                        _log4net.Info("Service charge deducted for the AccountID = " + x.Cur_AccountId);
                                    }
                                    else
                                    {
                                        _log4net.Info("Some Issue occured while deducting service charge for the AccountID = " + x.Cur_AccountId);
                                    }
                                }
                            }



                        }
                    }
                    catch (Exception e)
                    {
                        _log4net.Error("Exception in RunMonthlyJob() in MonthlyJobProvider");
                        _log4net.Error(e.Message);

                    }
                    _log4net.Info("Monthly Service Charge Deduction Completed");
                }
                return StatusCode(200);
            }
            catch (Exception e)
            {
                _log4net.Error("Monthy Charge Couldn't be applied due to exception");
                _log4net.Error(e.Message);
                return StatusCode(500);
            }
        }
    }
}
